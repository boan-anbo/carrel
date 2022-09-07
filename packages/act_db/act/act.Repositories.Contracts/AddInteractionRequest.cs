using act.Services.Model;

namespace act.Repositories.Contracts;

/// <summary>
///     AddOrUpdate request DTO for Interaction entity.
/// </summary>
public class CreateOrUpdateInteractionRequestDto: Interaction
{
    // if not provded, create new iteraction; if provided, update existing interaction
    public long? Id { get; set; }
    

    // if id is provided, uuid is required for double-checking
    public Guid? Uuid { get; set; }
    public string Label { get; set; }
    public string Description { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;
    public DateTime? Start { get; set; } = null;
    public DateTime? End { get; set; } = null;
    
    public string? Data { get; set; } = null;


    public List<CreateOrUpdateRelationDto>? ContextDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? SubjectDtos { get; set; } = new();

    public List<CreateOrUpdateRelationDto> FirstActDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? ObjectDtos { get; set; } = new();

    public List<CreateOrUpdateRelationDto>? SecondActDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? ParallelDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? IndirectObjectDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? SettingDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? ReferenceDtos { get; set; } = new();
    public List<CreateOrUpdateRelationDto>? PurposeDtos { get; set; } = new();
    public List<long>? PropertyIds { get; set; } = new();
    public InteractionIdentity Identity { get; set; } = InteractionIdentity.ENTITY;


    // validate method
    public bool ValidateOrThrow()
    {
        if (string.IsNullOrEmpty(Label))
            // check request type Id
            if (!(FirstActDtos.Count > 0))
                throw new Exception("Interaction must have act least one act in FirstActDtos");

        // check identity
        if (Identity == null) throw new Exception("Identity is required");


        // check relation types
        if (ContextDtos != null && ContextDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ContextIds must be larger than 0");

        if (ContextDtos != null && ContextDtos.Any(x => x.RelationType != RelationTypes.ContextRelation))

            throw new Exception(
                $"Relation items in contextIds must be of the type ContextRelation, but you provided {ContextDtos.FindAll(x => x.RelationType != RelationTypes.ContextRelation).FirstOrDefault().RelationType}");

        if (SubjectDtos != null && SubjectDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("SubjectIds must be larger than 0");
        // check relation type  
        if (SubjectDtos != null && SubjectDtos.Any(x => x.RelationType != RelationTypes.SubjectRelation))
            throw new Exception(
                $"Relation items in subjectIds must be of the type SubjectRelation, but you provided {SubjectDtos.FindAll(x => x.RelationType != RelationTypes.SubjectRelation).FirstOrDefault().RelationType}");


        if (ObjectDtos != null && ObjectDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ObjectIds must be larger than 0");
        if (ObjectDtos != null && ObjectDtos.Any(x => x.RelationType != RelationTypes.ObjectRelation))
            throw new Exception(
                $"Relation items in objectIds must be of the type ObjectRelation, but you provided {ObjectDtos.FindAll(x => x.RelationType != RelationTypes.ObjectRelation).FirstOrDefault()!.RelationType}");

        if (ParallelDtos != null && ParallelDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ParallelIds must be larger than 0");
        if (ParallelDtos != null && ParallelDtos.Any(x => x.RelationType != RelationTypes.ParallelRelation))
            if (ParallelDtos != null)
                throw new Exception(
                    $"Relation items in parallelIds must be of the type ParallelRelation, but you provided {ParallelDtos.FindAll(x => x.RelationType != RelationTypes.ParallelRelation).FirstOrDefault().RelationType}");
        
        
        if (SecondActDtos != null && SecondActDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("SecondActIds must be larger than 0");
        if (SecondActDtos != null && SecondActDtos.Any(x => x.RelationType != RelationTypes.SecondActRelation))
            throw new Exception(
                $"Relation items in secondActIds must be of the type SecondActRelation, but you provided {SecondActDtos.FindAll(x => x.RelationType != RelationTypes.SecondActRelation).FirstOrDefault().RelationType}");

        if (IndirectObjectDtos != null && IndirectObjectDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("IndirectObjectIds must be larger than 0");
        if (IndirectObjectDtos != null &&
            IndirectObjectDtos.Any(x => x.RelationType != RelationTypes.IndirectObjectRelation))
            throw new Exception(
                $"Relation items in indirectObjectIds must be of the type IndirectObjectRelation, but you provided {IndirectObjectDtos.FindAll(x => x.RelationType != RelationTypes.IndirectObjectRelation).FirstOrDefault()!.RelationType}");

        if (SettingDtos != null && SettingDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("SettingIds must be larger than 0");
        if (SettingDtos != null && SettingDtos.Any(x => x.RelationType != RelationTypes.SettingRelation))
            throw new Exception(
                $"Relation items in settingIds must be of the type SettingRelation, but you provided {SettingDtos.FindAll(x => x.RelationType != RelationTypes.SettingRelation).FirstOrDefault().RelationType}");

        if (ReferenceDtos != null && ReferenceDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ReferenceIds must be larger than 0");
        if (ReferenceDtos != null && ReferenceDtos.Any(x => x.RelationType != RelationTypes.ReferenceRelation))
            throw new Exception(
                $"Relation items in referenceIds must be of the type ReferenceRelation, but you provided {ReferenceDtos.FindAll(x => x.RelationType != RelationTypes.ReferenceRelation).FirstOrDefault().RelationType}");

        if (PurposeDtos != null && PurposeDtos.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("PurposeIds must be larger than 0");
        if (PurposeDtos != null && PurposeDtos.Any(x => x.RelationType != RelationTypes.PurposeRelation))
            throw new Exception(
                $"Relation items in purposeIds must be of the type PurposeRelation, but you provided {PurposeDtos.FindAll(x => x.RelationType != RelationTypes.PurposeRelation).FirstOrDefault()!.RelationType}");

        return true;
    }

    /// <summary>
    /// Get Interaction from DTO
    /// </summary>
    /// <returns></returns>
    public Interaction toInteraction()
    {
        return new Interaction
            {
                Id = Id ?? 0,
                Uuid = Uuid ?? Guid.NewGuid(),
                Label = Label,
                Description = Description,
                Identity = Identity,
                Start = Start,
                End = End,
                Properties = Properties,
                Data = Data,
            };
    }
}

public class CreateOrUpdateRelationDto
{

    /// <summary>
    /// Optional fields for creating relations independent of interaction creation.
    /// </summary>
    public Guid? Uuid { get; set; } = null;

    public long HostInteractionId { get; set; }
    public RelationTypes RelationType { get; set; }

    public string? Label { get; set; } = null;
    public string? Description { get; set; } = null;
    public string? Content { get; set; } = null;


    /// <summary>
    /// Required fields for creating relations as part of an interaction
    /// </summary>
    public RelationWeight Weight { get; set; } = RelationWeight.NotImportant;

    public long LinkedInteractionId { get; set; } = 0;

    public void ValidateNewRelationOrThrow()
    {
        if (HostInteractionId == null) throw new Exception("HostInteractionId is required");
        if (LinkedInteractionId == 0) throw new Exception("LinkedInteractionId is required");
    }

    public static T? toRelation<T>(CreateOrUpdateRelationDto dto) where T : Relation
    {
        var uuid = dto.Uuid ?? null;
        var label = dto.Label ?? "";
        var description = dto.Description ?? "";
        var content = dto.Content ?? "";
        return dto.RelationType switch
        {
            RelationTypes.ContextRelation => new ContextRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.SubjectRelation => new SubjectRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.ObjectRelation => new ObjectRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.IndirectObjectRelation => new IndirectObjectRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.SettingRelation => new SettingRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.PurposeRelation => new PurposeRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.ParallelRelation => new ParallelRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.ReferenceRelation => new ReferenceRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.FirstActRelation => new FirstActRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            RelationTypes.SecondActRelation => new SecondActRelation
            {
                Uuid = uuid,
                HostInteractionId = dto.HostInteractionId,
                Type = dto.RelationType,
                Label = label,
                Description = description,
                Content = content,
                Weight = dto.Weight,
                LinkedInteractionId = dto.LinkedInteractionId
            } as T,
            _ => throw new ArgumentOutOfRangeException()
        };
    }
}