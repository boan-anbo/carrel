using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace act.Repositories;

public class RelationRepository : IRelationRepository
{
    private readonly ActDbContext _dbContext;
    private readonly ILogger<RelationRepository> _logger;

    public RelationRepository(
        ActDbContext dbContext,
        ILogger<RelationRepository> logger
    )
    {
        _dbContext = dbContext;
        _logger = logger;
    }


    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }


    public async Task<T?> GetRelation<T>(int relationId, RelationTypes relationType) where T : Relation
    {
        switch (relationType)
        {
            case RelationTypes.ContextRelation:
                return await _dbContext.ContextRelations.FindAsync(relationId) as T;
            case RelationTypes.SubjectRelation:
                return await _dbContext.SubjectRelations.FindAsync(relationId) as T;
            case RelationTypes.ObjectRelation:
                return await _dbContext.ObjectRelations.FindAsync(relationId) as T;
            case RelationTypes.IndirectObjectRelation:
                return await _dbContext.IndirectObjectRelations.FindAsync(relationId) as T;
            case RelationTypes.SettingRelation:
                return await _dbContext.SettingRelations.FindAsync(relationId) as T;
            case RelationTypes.PurposeRelation:
                return await _dbContext.PurposeRelations.FindAsync(relationId) as T;
            case RelationTypes.ParallelRelation:
                return await _dbContext.ParallelRelations.FindAsync(relationId) as T;
            case RelationTypes.ReferenceRelation:
                return await _dbContext.ReferenceRelations.FindAsync(relationId) as T;
            default:
                throw new ArgumentOutOfRangeException(nameof(relationType), relationType, null);
        }
    }

    public async Task DeleteRelation(int id, RelationTypes type)
    {
        switch (type)
        {
            case RelationTypes.ContextRelation:
                _dbContext.ContextRelations.Remove(await _dbContext.ContextRelations.FindAsync(id));
                break;
            case RelationTypes.SubjectRelation:
                _dbContext.SubjectRelations.Remove(await _dbContext.SubjectRelations.FindAsync(id));
                break;
            case RelationTypes.ObjectRelation:
                _dbContext.ObjectRelations.Remove(await _dbContext.ObjectRelations.FindAsync(id));
                break;
            case RelationTypes.IndirectObjectRelation:
                _dbContext.IndirectObjectRelations.Remove(await _dbContext.IndirectObjectRelations.FindAsync(id));
                break;
            case RelationTypes.SettingRelation:
                _dbContext.SettingRelations.Remove(await _dbContext.SettingRelations.FindAsync(id));
                break;
            case RelationTypes.PurposeRelation:
                _dbContext.PurposeRelations.Remove(await _dbContext.PurposeRelations.FindAsync(id));
                break;
            case RelationTypes.ParallelRelation:
                _dbContext.ParallelRelations.Remove(await _dbContext.ParallelRelations.FindAsync(id));
                break;
            case RelationTypes.ReferenceRelation:
                _dbContext.ReferenceRelations.Remove(await _dbContext.ReferenceRelations.FindAsync(id));
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(type), type, null);
        }

        // persist
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> CheckIfRelationExists(int relationId, Guid relationUuid, RelationTypes relationType)
    {
        if (relationUuid == Guid.Empty || !(relationId > 0)) return false;

        return relationType switch
        {
            RelationTypes.SubjectRelation => await _dbContext.SubjectRelations.AnyAsync(i => i.Uuid == relationUuid),
            RelationTypes.ObjectRelation => await _dbContext.ObjectRelations.AnyAsync(i => i.Uuid == relationUuid),
            RelationTypes.IndirectObjectRelation => await _dbContext.IndirectObjectRelations.AnyAsync(i =>
                i.Uuid == relationUuid),
            RelationTypes.SettingRelation => await _dbContext.SettingRelations.AnyAsync(i => i.Uuid == relationUuid),
            RelationTypes.PurposeRelation => await _dbContext.PurposeRelations.AnyAsync(i => i.Uuid == relationUuid),
            RelationTypes.ParallelRelation => await _dbContext.ParallelRelations.AnyAsync(i => i.Uuid == relationUuid),
            RelationTypes.ReferenceRelation =>
                await _dbContext.ReferenceRelations.AnyAsync(i => i.Uuid == relationUuid),
            RelationTypes.ContextRelation => await _dbContext.ContextRelations.AnyAsync(i => i.Uuid == relationUuid),
            _ => throw new ArgumentOutOfRangeException(nameof(relationType), relationType, null)
        };
    }

    public T? CreateRelation<T>(CreateOrUpdateRelationDto request, Interaction? hostInteraction) where T : Relation
    {
        // check if linked interaction exists
        if (!(request.LinkedInteractionId > 0))
            // throw proper asp.net core exception
            throw new InvalidOperationException(
                $"Linked interaction id {request.LinkedInteractionId} is not valid for creating relation");

        var linkedInteraction = _dbContext.Interactions.Any(i => i.Id == request.LinkedInteractionId);
        if (!linkedInteraction)
            // throw proper asp.net core exception
            throw new InvalidOperationException(
                $"Linked interaction id {request.LinkedInteractionId} does not exist for creating relation with");


        switch (request.RelationType)
        {
            case RelationTypes.SubjectRelation:
                var subjectRelation = CreateOrUpdateRelationDto.toRelation<SubjectRelation>(request);
                _dbContext.SubjectRelations.Update(subjectRelation);
                return subjectRelation as T;
            case RelationTypes.ObjectRelation:
                var objectRelation = CreateOrUpdateRelationDto.toRelation<ObjectRelation>(request);
                _dbContext.ObjectRelations.Update(objectRelation);
                return objectRelation as T;
            case RelationTypes.ParallelRelation:
                var parallelRelation = CreateOrUpdateRelationDto.toRelation<ParallelRelation>(request);
                _dbContext.ParallelRelations.Update(parallelRelation);
                return parallelRelation as T;
            case RelationTypes.SettingRelation:
                var settingRelation = CreateOrUpdateRelationDto.toRelation<SettingRelation>(request);
                _dbContext.SettingRelations.Update(settingRelation);
                return settingRelation as T;
            case RelationTypes.ContextRelation:
                var contextRelation = CreateOrUpdateRelationDto.toRelation<ContextRelation>(request);
                _dbContext.ContextRelations.Update(contextRelation);
                return contextRelation as T;
            case RelationTypes.IndirectObjectRelation:
                var indirectObjectRelation = CreateOrUpdateRelationDto.toRelation<IndirectObjectRelation>(request);
                _dbContext.IndirectObjectRelations.Update(indirectObjectRelation);
                return indirectObjectRelation as T;
            case RelationTypes.PurposeRelation:
                var purposeRelation = CreateOrUpdateRelationDto.toRelation<PurposeRelation>(request);
                _dbContext.PurposeRelations.Update(purposeRelation);
                return purposeRelation as T;
            case RelationTypes.ReferenceRelation:
                var referenceRelation = CreateOrUpdateRelationDto.toRelation<ReferenceRelation>(request);
                _dbContext.ReferenceRelations.Update(referenceRelation);
                return referenceRelation as T;
            default:
                throw new ArgumentOutOfRangeException(nameof(request.RelationType), request.RelationType,
                    "Relation type not supported");
        }
    }


    public T? CreateRelationWithHostInteractionId<T>(CreateOrUpdateRelationDto request) where T : Relation
    {
        // load host interaction
        var hostInteraction = _dbContext.Interactions.Find(request.HostInteractionId);
        if (hostInteraction == null)
            // throw proper asp.net core exception
            throw new InvalidOperationException(
                $"Host interaction id {request.HostInteractionId} does not exist for creating relation with");
        // create relation
        return CreateRelation<T>(request, hostInteraction);
    }

    public async Task DeleteRelation(Guid relationId, int hostInteractionId, int linkedInteractionId,
        RelationTypes type)
    {
        switch (type)
        {
            case RelationTypes.ContextRelation:
                _dbContext.ContextRelations.Remove(await _dbContext.ContextRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.SubjectRelation:
                _dbContext.SubjectRelations.Remove(await _dbContext.SubjectRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.ObjectRelation:
                _dbContext.ObjectRelations.Remove(await _dbContext.ObjectRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.IndirectObjectRelation:
                _dbContext.IndirectObjectRelations.Remove(await _dbContext.IndirectObjectRelations.FirstOrDefaultAsync(
                    x => x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                         x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.SettingRelation:
                _dbContext.SettingRelations.Remove(await _dbContext.SettingRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.PurposeRelation:
                _dbContext.PurposeRelations.Remove(await _dbContext.PurposeRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.ParallelRelation:
                _dbContext.ParallelRelations.Remove(await _dbContext.ParallelRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            case RelationTypes.ReferenceRelation:
                _dbContext.ReferenceRelations.Remove(await _dbContext.ReferenceRelations.FirstOrDefaultAsync(x =>
                    x.Uuid == relationId && x.HostInteractionId == hostInteractionId &&
                    x.LinkedInteractionId == linkedInteractionId));
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(type), type, null);
        }

        /// persist
        await _dbContext.SaveChangesAsync();
    }
}