using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using act.API.Common.Settings;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Contracts;
using act.Services.Model;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace act.Services;

public class InteractionService : IInteractionService
{
    private readonly ActDbContext _db;
    private readonly IMapper _mapper;

    private readonly IInteractionRepository _repo;
    private AppSettings _settings;

    /// <summary>
    ///     Main logic for interaction
    /// </summary>
    /// <param name="settings"></param>
    /// <param name="mapper"></param>
    /// <param name="repo"></param>
    /// <param name="dbContext"></param>
    public InteractionService(
        IOptions<AppSettings> settings,
        IMapper mapper,
        IInteractionRepository repo,
        ActDbContext dbContext
    )
    {
        _settings = settings?.Value;
        _mapper = mapper;
        _repo = repo;
        _db = dbContext;
    }

    public async Task<Interaction> CreateAsync(Interaction interaction)
    {
        return await _repo.AddOrCreateInteraction(interaction);
    }

    public async Task<Interaction> CreateNewInteraction(string label)
    {
        var interaction = new Interaction
        {
            Label = label
        };
        return await _repo.AddOrCreateInteraction(interaction);
    }


    
    /// <summary>
    ///     Get all interactions
    /// </summary>
    /// <param name="subjects"></param>
    /// <param name="relationType"></param>
    /// <param name="objects"></param>
    /// <returns></returns>
    public async Task<Interaction> CreateInteraction(ICollection<Interaction> subjects, string relationType,
        ICollection<Interaction> objects)
    {
        var hostInteraction = new Interaction
        {
            Description = relationType
        };

        var subjectRelations = subjects.Select(subjectInteraction =>
        {
            var relation = new SubjectRelation
            {
                HostInteraction = hostInteraction,
                LinkedInteraction = subjectInteraction
            };
            return relation;
        }).ToList();

        // do object relations
        var objectRelations = objects.Select(objectInteraction =>
        {
            var relation = new ObjectRelation
            {
                HostInteraction = hostInteraction,
                LinkedInteraction = objectInteraction
            };
            return relation;
        }).ToList();

        hostInteraction.Subjects = subjectRelations;
        hostInteraction.Objects = objectRelations;

        return await _repo.AddOrCreateInteraction(hostInteraction);
    }


    public async Task<bool> UpdateAsync(Interaction interaction)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Interaction> GetAsync(int id)
    {
        return new Interaction();
    }

    public async Task<bool> Test()
    {
        return true;
    }

    public IQueryable<Interaction> GetAllInteractions()
    {
        return _db.Interactions;
    }
}