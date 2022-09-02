using System.ComponentModel.DataAnnotations;

namespace act.Services.Model
{
    /// <summary>
    /// To describe a parallel relations between the host interaction and its related interactions.
    /// </summary>
    /// <remarks>
    /// <para>
    /// An example of parallel relation is the relationship between the beginning and finishing act of something, e.g. "A begins working on B" has as its parallel interactions "A finishes working on B". 
    /// </para>
    /// <para>
    /// In each interactions, A has the subject relation, and B has the object relation.
    /// </para>
    /// </remarks>
    public class ParallelRelation : Relation
    {
    }
}