using HotChocolate;

namespace act.Repositories.Interface;

// string label = 1;
// string description = 2;
//
// int32 typeId = 4;
// /// Unix timestamp in  milliseconds.
// sint64 start = 5;
// /// Unix timestamp in  milliseconds.
// sint64 end = 6;
// repeated int32 subjectIds = 7;
// repeated int32 relatedIds = 8;
// repeated int32 objectIds = 9;
// repeated int32 propertyIds = 10;
// AddInteractionIdentity identity = 11;
public class CreateOrUpdateInteractionRequestDto
{
    public int Id { get; set; }
    public Guid Uuid { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public int TypeId { get; set; };
    public int Start { get; set; }
    public int End { get; set; }
    public List<int> SubjectIds { get; set; }
    public List<int> RelatedIds { get; set; }
    public List<int> ObjectIds { get; set; }
    public List<int> PropertyIds { get; set; }
    public AddInteractionIdentity Identity { get; set; }


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