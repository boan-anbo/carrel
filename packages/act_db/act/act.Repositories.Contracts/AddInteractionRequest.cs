using act.Services.Model;

namespace act.Repositories.Contracts;

/// <summary>
///     AddOrUpdate request DTO for Interaction entity.
/// </summary>
public class CreateOrUpdateInteractionRequestDto
{
    // if not provded, create new iteraction; if provided, update existing interaction
    public int? Id { get; set; }

    // if id is provided, uuid is required for double-checking
    public Guid? Uuid { get; set; }
    public string Label { get; set; }
    public string? Description { get; set; }
    public int FirstActId { get; set; }
    public int SecondActId { get; set; }
    public long Start { get; set; }
    public long End { get; set; }

    public List<CreateOrUpdateRelationDto> ContextIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> SubjectIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> ObjectIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> ParallelIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> IndirectObjectIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> SettingIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> ReferenceIds { get; set; } = new();
    public List<CreateOrUpdateRelationDto> PurposeIds { get; set; } = new();
    public List<int>? PropertyIds { get; set; }
    public AddInteractionIdentity? Identity { get; set; }


    // validate method
    public bool ValidateOrThrow()
    {
        if (string.IsNullOrEmpty(Label))
            // check request type Id
            if (!(FirstActId > 0))
                throw new Exception("TypeId must be larger than 0");

        // check identity
        if (Identity == null) throw new Exception("Identity is required");

        if (!(FirstActId > 0)) throw new Exception("TypeId is required");

        // check relation ids, throw if linked interaction ids are 0
        if (SubjectIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("SubjectIds must be larger than 0");
        // check relation type  
        if (SubjectIds.Any(x => x.RelationType != RelationTypes.SubjectRelation))
            throw new Exception(
                $"Items in subjectIds must be of type SubjectRelation, but you provided {SubjectIds.FindAll(x => x.RelationType != RelationTypes.SubjectRelation).ToString()}");

        if (ObjectIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ObjectIds must be larger than 0");
        if (ObjectIds.Any(x => x.RelationType != RelationTypes.ObjectRelation))
            throw new Exception(
                $"Items in objectIds must be of type ObjectRelation, but you provided {ObjectIds.FindAll(x => x.RelationType != RelationTypes.ObjectRelation).ToString()}");

        if (ParallelIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ParallelIds must be larger than 0");
        if (ParallelIds.Any(x => x.RelationType != RelationTypes.ParallelRelation))
            throw new Exception(
                $"Items in parallelIds must be of type ParallelRelation, but you provided {ParallelIds.FindAll(x => x.RelationType != RelationTypes.ParallelRelation).ToString()}");

        if (IndirectObjectIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("IndirectObjectIds must be larger than 0");
        if (IndirectObjectIds.Any(x => x.RelationType != RelationTypes.IndirectObjectRelation))
            throw new Exception(
                $"Items in indirectObjectIds must be of type IndirectObjectRelation, but you provided {IndirectObjectIds.FindAll(x => x.RelationType != RelationTypes.IndirectObjectRelation).ToString()}");

        if (SettingIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("SettingIds must be larger than 0");
        if (SettingIds.Any(x => x.RelationType != RelationTypes.SettingRelation))
            throw new Exception(
                $"Items in settingIds must be of type SettingRelation, but you provided {SettingIds.FindAll(x => x.RelationType != RelationTypes.SettingRelation).ToString()}");

        if (ReferenceIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("ReferenceIds must be larger than 0");
        if (ReferenceIds.Any(x => x.RelationType != RelationTypes.ReferenceRelation))
            throw new Exception(
                $"Items in referenceIds must be of type ReferenceRelation, but you provided {ReferenceIds.FindAll(x => x.RelationType != RelationTypes.ReferenceRelation).ToString()}");

        if (PurposeIds.Any(x => !(x.LinkedInteractionId > 0)))
            throw new Exception("PurposeIds must be larger than 0");
        if (PurposeIds.Any(x => x.RelationType != RelationTypes.PurposeRelation))
            throw new Exception(
                $"Items in purposeIds must be of type PurposeRelation, but you provided {PurposeIds.FindAll(x => x.RelationType != RelationTypes.PurposeRelation).ToString()}");


        return true;
    }
}

public enum AddInteractionIdentity
{
    ENTITY = 0,
    ACT = 1,
    SOURCE = 2
}

public class CreateOrUpdateRelationDto
{

    public int? Id { get; set; } = null;

    /// <summary>
    /// Optional fields for creating relations independent of interaction creation.
    /// </summary>
    public Guid? Uuid { get; set; } = null;

    public int HostInteractionId { get; set; }
    public RelationTypes RelationType { get; set; }

    public string? Label { get; set; } = null;
    public string? Description { get; set; } = null;
    public string? Content { get; set; } = null;


    /// <summary>
    /// Required fields for creating relations as part of an interaction
    /// </summary>
    public RelationWeight Weight { get; set; } = RelationWeight.NotImportant;

    public int LinkedInteractionId { get; set; } = 0;

    public void ValidateNewRelationOrThrow()
    {
        if (HostInteractionId == null) throw new Exception("HostInteractionId is required");
        if (LinkedInteractionId == 0) throw new Exception("LinkedInteractionId is required");
    }

    public static T? toRelation<T>(CreateOrUpdateRelationDto dto) where T : Relation
    {
        var id = dto.Id ?? 0;
        var uuid = dto.Uuid ?? Guid.NewGuid();
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
            _ => throw new ArgumentOutOfRangeException()
        };
    }
}