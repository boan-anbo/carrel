namespace act.Repositories.Contracts;


/// <summary>
/// AddOrUpdate request DTO for Interaction entity.
/// </summary>
public class CreateOrUpdateInteractionRequestDto
{
    public int? Id { get; set; }
    public Guid? Uuid { get; set; }
    public string Label { get; set; }
    public string? Description { get; set; }
    public int TypeId { get; set; }
    public long Start { get; set; }
    public long End { get; set; }
    public List<int>? SubjectIds { get; set; }
    public List<int>? RelatedIds { get; set; }
    public List<int>? ObjectIds { get; set; }
    public List<int>? PropertyIds { get; set; }
    public AddInteractionIdentity? Identity { get; set; }


    // validate method
    public bool ValidateOrThrow()
    {
        if (string.IsNullOrEmpty(Label))
        {
            // check request type Id
            if (!(TypeId > 0))
            {
                throw new Exception("TypeId must be larger than 0");
            }
        }
        
        // check identity
        if (Identity == null)
        {
            throw new Exception("Identity is required");
        }

        return true;
    }
}

// enum AddInteractionIdentity {
//     ENTITY = 0;
//     ACT = 1;
//     SOURCE = 2;
// }
public enum AddInteractionIdentity
{
    ENTITY = 0,
    ACT = 1,
    SOURCE = 2
}