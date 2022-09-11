using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using act.API.Common.Settings;
using act.Repositories.Contracts;
using act.Repositories.Db;
using act.Services.Contracts;
using act.Services.Model;
using AutoMapper;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace act.Services;

public class InteractionService : IInteractionService
{
    private readonly InteractDbContext _dbContext;
    private readonly IMapper _mapper;

    private readonly IInteractionRepository _interactionRepo;
    private AppSettings _settings;
    private readonly IRelationRepository _relationRepo;
    private readonly ILogger<InteractionService> _logger;


    /// <summary>
    ///     Main logic for interaction
    /// </summary>
    /// <param name="settings"></param>
    /// <param name="mapper"></param>
    /// <param name="interactionRepo"></param>
    /// <param name="dbContextContext"></param>
    public InteractionService(
        IOptions<AppSettings> settings,
        IMapper mapper,
        IInteractionRepository interactionRepo,
        IRelationRepository relationRepo,
        InteractDbContext dbContextContext,
        ILogger<InteractionService> logger
    )
    {
        _settings = settings?.Value;
        _mapper = mapper;
        this._interactionRepo = interactionRepo;
        _relationRepo = relationRepo;
        _dbContext = dbContextContext;
        _logger = logger;
    }

    public async Task<Interaction> CreateAsync(Interaction interaction)
    {
        return await _interactionRepo.AddOrCreateInteraction(interaction);
    }

    public async Task<Interaction> CreateNewInteraction(string label)
    {
        var interaction = new Interaction
        {
            Label = label
        };
        return await _interactionRepo.AddOrCreateInteraction(interaction);
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

        return await _interactionRepo.AddOrCreateInteraction(hostInteraction);
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
        return _dbContext.Interactions;
    }

    public async Task UpdateInteractionRelations(
        CreateOrUpdateInteractionRequestDto requestDto,
        Interaction? interaction
    )
    {
        _interactionRepo.LoadAllRelationsOfInteraction(interaction.Id);
        // for subjects
        // if no subjects are provided, remove all subjects
        if (requestDto.SubjectDtos is null)
        {
            interaction.Subjects.Clear();
        }
        else
        {
            foreach (var interactionSubject in
                     GetHostRelationsWOTracing<SubjectRelation>(interaction, RelationTypes.SubjectRelation)
                    )
            {
                // if the subject is not in the requestDto.subjectDtos, remove it
                if (!requestDto.SubjectDtos.Any(s => s.Uuid == interactionSubject.Uuid))
                {
                    _logger.LogInformation($"Removing subject {interactionSubject.Uuid}");
                    _dbContext.SubjectRelations.Remove(interactionSubject);
                }
            }
        }


        if (requestDto.SubjectDtos is not null)
        {
            requestDto.SubjectDtos?.ForEach(createSubjectDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createSubjectDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<SubjectRelation>(createSubjectDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating subject relation");
                    throw;
                }
            });
        }

        // for parallels
        // if no parallels are provided, remove all parallels
        if (requestDto.ParallelDtos is null)
        {
            interaction.Parallels.Clear();
        }
        else
        {
            foreach (var interactionParallel in GetHostRelationsWOTracing<ParallelRelation>(interaction,
                         RelationTypes.ParallelRelation))
            {
                // if the parallel is not in the requestDto.parallelDtos, remove it
                if (!requestDto.ParallelDtos.Any(s => s.Uuid == interactionParallel.Uuid))
                {
                    _logger.LogInformation($"Removing parallel {interactionParallel.Uuid}");
                    _dbContext.ParallelRelations.Remove(interactionParallel);
                }
            }
        }


        if (requestDto.ParallelDtos is not null)
        {
            requestDto.ParallelDtos?.ForEach(createParallelDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createParallelDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ParallelRelation>(createParallelDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating parallel relation");
                    throw;
                }
            });
        }

        // for first acts

        // if no first acts are provided, remove all first acts
        if (requestDto.FirstActDtos is null)
        {
            interaction.FirstActs.Clear();
        }
        else
        {
            foreach (var interactionFirstAct in GetHostRelationsWOTracing<FirstActRelation>(interaction,
                         RelationTypes.FirstActRelation))
            {
                // if the first act is not in the requestDto.firstActDtos, remove it
                if (!requestDto.FirstActDtos.Any(s => s.Uuid == interactionFirstAct.Uuid))
                {
                    _logger.LogInformation($"Removing first act {interactionFirstAct.Uuid}");
                    _dbContext.FirstActRelations.Remove(interactionFirstAct);
                }
            }
        }


        if (requestDto.FirstActDtos is not null)
        {
            requestDto.FirstActDtos?.ForEach(createFirstActDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createFirstActDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<FirstActRelation>(createFirstActDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating first act relation");
                    throw;
                }
            });
        }

        // for second acts

        // if no second acts are provided, remove all second acts

        if (requestDto.SecondActDtos is null)
        {
            interaction.SecondActs.Clear();
        }
        else
        {
            foreach (var interactionSecondAct in GetHostRelationsWOTracing<SecondActRelation>(interaction,
                         RelationTypes.SecondActRelation))
            {
                // if the second act is not in the requestDto.secondActDtos, remove it
                if (!requestDto.SecondActDtos.Any(s => s.Uuid == interactionSecondAct.Uuid))
                {
                    _logger.LogInformation($"Removing second act {interactionSecondAct.Uuid}");
                    _dbContext.SecondActRelations.Remove(interactionSecondAct);
                }
            }
        }

        if (requestDto.SecondActDtos is not null)
        {
            requestDto.SecondActDtos?.ForEach(createSecondActDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createSecondActDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<SecondActRelation>(createSecondActDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating second act relation");
                    throw;
                }
            });
        }

        // for objects

        // if no objects are provided, remove all objects

        if (requestDto.ObjectDtos is null)
        {
            interaction.Objects.Clear();
        }
        else
        {
            foreach (var interactionObject in GetHostRelationsWOTracing<ObjectRelation>(interaction,
                         RelationTypes.ObjectRelation))
            {
                // if the object is not in the requestDto.objectDtos, remove it
                if (!requestDto.ObjectDtos.Any(s => s.Uuid == interactionObject.Uuid))
                {
                    _logger.LogInformation($"Removing object {interactionObject.Uuid}");
                    _dbContext.ObjectRelations.Remove(interactionObject);
                }
            }
        }


        if (requestDto.ObjectDtos is not null)
        {
            requestDto.ObjectDtos?.ForEach(createObjectDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createObjectDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ObjectRelation>(createObjectDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating object relation");
                    throw;
                }
            });
        }

        // for indirect objects

        // if no indirect objects are provided, remove all indirect objects

        if (requestDto.IndirectObjectDtos is null)
        {
            interaction.IndirectObjects.Clear();
        }
        else
        {
            foreach (var interactionIndirectObject in GetHostRelationsWOTracing<IndirectObjectRelation>(interaction,
                         RelationTypes.IndirectObjectRelation))
            {
                // if the indirect object is not in the requestDto.indirectObjectDtos, remove it
                if (!requestDto.IndirectObjectDtos.Any(s => s.Uuid == interactionIndirectObject.Uuid))
                {
                    _logger.LogInformation($"Removing indirect object {interactionIndirectObject.Uuid}");
                    _dbContext.IndirectObjectRelations.Remove(interactionIndirectObject);
                }
            }
        }

        if (requestDto.IndirectObjectDtos is not null)
        {
            requestDto.IndirectObjectDtos?.ForEach(createIndirectObjectDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createIndirectObjectDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<IndirectObjectRelation>(createIndirectObjectDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating indirect object relation");
                    throw;
                }
            });
        }

        // for settings

        // if no settings are provided, remove all settings

        if (requestDto.SettingDtos is null)
        {
            interaction.Settings.Clear();
        }
        else
        {
            foreach (var interactionSetting in GetHostRelationsWOTracing<SettingRelation>(interaction,
                         RelationTypes.SettingRelation))
            {
                // if the setting is not in the requestDto.settingDtos, remove it
                if (!requestDto.SettingDtos.Any(s => s.Uuid == interactionSetting.Uuid))
                {
                    _logger.LogInformation($"Removing setting {interactionSetting.Uuid}");
                    _dbContext.SettingRelations.Remove(interactionSetting);
                }
            }
        }


        if (requestDto.SettingDtos is not null)
        {
            requestDto.SettingDtos?.ForEach(createSettingDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createSettingDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<SettingRelation>(createSettingDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating setting relation");
                    throw;
                }
            });
        }

        // for contexts 

        // if no contexts are provided, remove all contexts

        if (requestDto.ContextDtos is null)
        {
            interaction.Contexts.Clear();
        }
        else
        {
            foreach (var interactionContext in
                     GetHostRelationsWOTracing<ContextRelation>(interaction, RelationTypes.ContextRelation))
            {
                // if the context is not in the requestDto.contextDtos, remove it
                if (!requestDto.ContextDtos.Any(s => s.Uuid == interactionContext.Uuid))
                {
                    _logger.LogInformation($"Removing context {interactionContext.Uuid}");
                    _dbContext.ContextRelations.Remove(interactionContext);
                }
            }
        }


        if (requestDto.ContextDtos is not null)
        {
            requestDto.ContextDtos?.ForEach(createContextDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createContextDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ContextRelation>(createContextDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating context relation");
                    throw;
                }
            });
        }

        // for purposes

        // if no purposes are provided, remove all purposes


        if (requestDto.PurposeDtos is null)
        {
            interaction.Purposes.Clear();
        }
        else
        {
            foreach (var interactionPurpose in GetHostRelationsWOTracing<PurposeRelation>(interaction,
                         RelationTypes.PurposeRelation))

            {
                // if the purpose is not in the requestDto.purposeDtos, remove it
                if (!requestDto.PurposeDtos.Any(s => s.Uuid == interactionPurpose.Uuid))
                {
                    _logger.LogInformation($"Removing purpose {interactionPurpose.Uuid}");
                    _dbContext.PurposeRelations.Remove(interactionPurpose);
                }
            }
        }


        if (requestDto.PurposeDtos is not null)
        {
            requestDto.PurposeDtos?.ForEach(createPurposeDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createPurposeDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<PurposeRelation>(createPurposeDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating purpose relation");
                    throw;
                }
            });
        }

        // for references

        // if no references are provided, remove all references

        if (requestDto.ReferenceDtos is null)
        {
            interaction.References.Clear();
        }
        else
        {
            foreach (var interactionReference in GetHostRelationsWOTracing<ReferenceRelation>(interaction,
                         RelationTypes.ReferenceRelation))
            {
                // if the reference is not in the requestDto.referenceDtos, remove it
                if (!requestDto.ReferenceDtos.Any(s => s.Uuid == interactionReference.Uuid))
                {
                    _logger.LogInformation($"Removing reference {interactionReference.Uuid}");
                    _dbContext.ReferenceRelations.Remove(interactionReference);
                }
            }
        }


        if (requestDto.ReferenceDtos is not null)
        {
            requestDto.ReferenceDtos?.ForEach(createReferenceDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createReferenceDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<ReferenceRelation>(createReferenceDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating reference relation");
                    throw;
                }
            });
        }
        
        // for categories
        
        // if no categories are provided, remove all categories
        
        if (requestDto.CategoryDtos is null)
        {
            interaction.Categories.Clear();
        }
        else
        {
            foreach (var interactionCategory in GetHostRelationsWOTracing<CategoryRelation>(interaction,
                         RelationTypes.CategoryRelation))
            {
                // if the category is not in the requestDto.categoryDtos, remove it
                if (!requestDto.CategoryDtos.Any(s => s.Uuid == interactionCategory.Uuid))
                {
                    _logger.LogInformation($"Removing category {interactionCategory.Uuid}");
                    _dbContext.CategoryRelations.Remove(interactionCategory);
                }
            }
        }
        
        if (requestDto.CategoryDtos is not null)
        {
            requestDto.CategoryDtos?.ForEach(createCategoryDto =>
            {
                ValidateOrCorrectDtoHostInteractionId(interaction, createCategoryDto);
                try
                {
                    _relationRepo.CreateOrUpdateRelation<CategoryRelation>(createCategoryDto);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error creating category relation");
                    throw;
                }
            });
        }
    }

    private IQueryable<T> GetHostRelationsWOTracing<T>(Interaction interaction,
        RelationTypes relationType)
        where T : Relation
    {
        return relationType switch
        {
            RelationTypes.SubjectRelation => _dbContext.SubjectRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.ContextRelation =>  _dbContext.ContextRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.FirstActRelation => _dbContext.FirstActRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.ObjectRelation => _dbContext.ObjectRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.SecondActRelation => _dbContext.SecondActRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.IndirectObjectRelation => _dbContext.IndirectObjectRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.SettingRelation => _dbContext.SettingRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.PurposeRelation => _dbContext.PurposeRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.ParallelRelation => _dbContext.ParallelRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.ReferenceRelation => _dbContext.ReferenceRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            RelationTypes.CategoryRelation => _dbContext.CategoryRelations.Where(x =>
                x.HostInteractionId == interaction.Id).AsNoTracking() as IQueryable<T>,
            _ => throw new ArgumentOutOfRangeException(nameof(relationType), relationType, null)
        };

    }

    private static void ValidateOrCorrectDtoHostInteractionId(Interaction? interaction,
        CreateOrUpdateRelationDto createOrUpdateRelationDto)
    {
        if (createOrUpdateRelationDto.HostInteractionId == 0)
        {
            createOrUpdateRelationDto.HostInteractionId = interaction.Id;
        }

        // check if dto's host interaction id is the same as the interaction id
        if (createOrUpdateRelationDto.HostInteractionId != interaction.Id)
        {
            throw new Exception(
                $"Relation DTO's host interaction id ({createOrUpdateRelationDto.HostInteractionId}) does not match the interaction id ({interaction.Id})");
        }
    }
}