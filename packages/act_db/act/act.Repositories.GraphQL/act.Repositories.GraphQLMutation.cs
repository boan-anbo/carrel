using System.Collections;
using act.Repositories.Contracts;
using act.Repositories.Interface;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace act.Repositories.GraphQL;

public class GraphQLMutation
{
    private readonly ILogger _logger;

    // constructor
    public GraphQLMutation(
        [Service(ServiceKind.Synchronized)] ILogger logger)
    {
        _logger = logger;
    }

    public async Task<Interaction?> AddNewEntityInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        String label
    )
    {
        var interaction = Interaction.FromLabel(label);
        interaction.SetEntityIdentityAndType();
        await _repo.AddInteraction(interaction);


        return await _repo.GetInteractionScalar(interaction.Id);
    }

    public async Task<int> DeleteInteraction(
        int id,
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo
    )
    {
        await _repo.DeleteInteraction(id);
        return Task.FromResult(id).Result;
    }

    /// <summary>
    /// Core opetions to add or update interaction
    /// </summary>
    /// <remarks>
    /// If ID and UUID are not provided, a new interaction is created.
    /// If both are provided, the interaction is updated.
    /// Validation is performed on the interaction before it is saved.
    /// </remarks>
    [UseProjection]
    public async Task<Interaction> CreateOrUpdateInteraction(
        [Service(ServiceKind.Synchronized)] IInteractionRepository _repo,
        CreateOrUpdateInteractionRequestDto requestDto
    )
    {
        requestDto.ValidateOrThrow();
        // convert identity
        InteractionIdentity identity = InteractionIdentity.ACT;
        // switch (request.Identity)

        switch (requestDto.Identity)
        {
            case AddInteractionIdentity.ENTITY:
                identity = InteractionIdentity.ENTITY;
                break;
            case AddInteractionIdentity.ACT:
                identity = InteractionIdentity.ACT;
                break;
            case AddInteractionIdentity.SOURCE:
                identity = InteractionIdentity.SOURCE;
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }


        var end = DateTimeOffset.FromUnixTimeMilliseconds(requestDto.End);
        var start = DateTimeOffset.FromUnixTimeMilliseconds(requestDto.Start);
        // load related entities
        ICollection<SubjectRelation> subjectRelations = await _repo.GetSubjectRelations(requestDto.SubjectIds);
        ICollection<ObjectRelation> objectRelations = await _repo.GetObjectRelations(requestDto.ObjectIds);
        ICollection<ParallelRelation> parallelRelations = await _repo.GetParallelRelations(requestDto.RelatedIds);
        ICollection<Property> properties = await _repo.GetProperties(requestDto.PropertyIds);


        // check existence if an ID and an GUID are provided
        // if not, create interaction as a new one
        if (requestDto.Id != null && requestDto.Id > 0 && requestDto.Uuid is not null && requestDto.Uuid.ToString().Length > 0)
        {
            var exists = await _repo.CheckIfInteractionExists(requestDto.Id ?? 0, requestDto.Uuid ?? Guid.Empty);
            if (!exists)
            {
                throw new ArgumentException(
                    "Update Interaction with ID and GUID are provided but they do not match any interactions in the DB.");
            }
        }

        var interaction = new Interaction
        {
            Id = requestDto.Id ?? 0,
            Uuid = requestDto.Uuid ?? Guid.NewGuid(),
            Label = requestDto.Label,
            Description = requestDto.Description,
            Identity = identity,
            TypeId = requestDto.TypeId,
            Start = start.DateTime,
            End = end.DateTime,
            Subjects = subjectRelations,
            Related = parallelRelations,
            Objects = objectRelations,
            Properties = properties
        };


        await _repo.AddInteraction(interaction);
        var returnedInteraction = await _repo.GetInteractionScalar(interaction.Id);
        return returnedInteraction;
    }
}