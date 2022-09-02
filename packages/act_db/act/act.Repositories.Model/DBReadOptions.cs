namespace act.Services.Model;

public class DBReadOptions
{
    /// <summary>
    /// The threshold for loading related interactions. Interactions with the same or higher weight will be loaded.
    /// </summary>
    /// <remarks>
    /// E.g. if this is set to 0.5, subject interactions with weight 0.5 or higher will be automatically loaded.
    /// </remarks>
    public int SubjectRelationThreshold { get; set; } = 0;
    /// <summary>
    /// Whether to load related interactions for the subject at all. Turn off this to save cost of checking threshold and load relations.
    /// </summary>
    public bool IncludeSubjectInteractions { get; set; } = true;
    
    public int ObjectRelationThreshold { get; set; } = 0;
    public bool IncludeObjectInteractions { get; set; } = true;
    
    public int ParallelRelationThreshold { get; set; } = 0;
    public bool IncludeParallelInteractions { get; set; } = true;

}