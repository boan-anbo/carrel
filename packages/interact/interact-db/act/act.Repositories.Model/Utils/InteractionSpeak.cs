using System.Linq;
using System.Text;

namespace act.Services.Model.Utils;

public class InteractionSpeak
{
    /// <summary>
    /// Update sentence based on current entities and relations
    ///  </summary>
    /// <param name="interaction"></param>
    public static string UpdateSentence(Interaction interaction)
    {
        var sb = new StringBuilder();

        var contexts = interaction.Contexts.Select(s => s.LinkedInteraction.Label).ToList();
        var subjects = interaction.Subjects.Select(s => s.LinkedInteraction.Label).ToList();
        var firstActs = interaction.FirstActs.Select(s => s.LinkedInteraction.Label).ToList();
        var objects = interaction.Objects.Select(s => s.LinkedInteraction.Label).ToList();
        var secondActs = interaction.SecondActs.Select(s => s.LinkedInteraction.Label).ToList();
        var indirectObjects = interaction.IndirectObjects.Select(s => s.LinkedInteraction.Label).ToList();
        var settings = interaction.Settings.Select(s => s.LinkedInteraction.Label).ToList();
        var purposes = interaction.Purposes.Select(s => s.LinkedInteraction.Label).ToList();
        var parallels = interaction.Parallels.Select(s => s.LinkedInteraction.Label).ToList();
        var references = interaction.References.Select(s => s.LinkedInteraction.Label).ToList();
        var tags = interaction.Tags.Select(s => s.LinkedInteraction.Label).ToList();

        if (contexts.Any())
        {
            sb.Append("Given");
            // for each loop with index
            foreach (var (label, index) in contexts.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, contexts.Count - 1);
            }

            sb.Append(',');
        }

        if (subjects.Any())
        {
            // for each loop with index
            foreach (var (label, index) in subjects.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, subjects.Count - 1);
            }
        }

        if (firstActs.Any())
        {
            // sb.Append("In the context(s) of");
            // for each loop with index
            foreach (var (label, index) in firstActs.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, firstActs.Count - 1);
            }
        }

        if (objects.Any())
        {
            // for each loop with index
            foreach (var (label, index) in objects.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, objects.Count - 1);
            }
        }

        if (secondActs.Any())
        {
            // for each loop with index
            foreach (var (label, index) in secondActs.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, secondActs.Count - 1);
            }
        }

        if (indirectObjects.Any())
        {
            // for each loop with index
            foreach (var (label, index) in indirectObjects.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, indirectObjects.Count - 1);
            }
        }

        if (settings.Any())
        {
            if (sb.Length > 0)
            {
                sb.Append(", ");
                sb.Append("in settings of");
            }

            // for each loop with index
            foreach (var (label, index) in settings.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, settings.Count - 1);
            }
        }

        if (purposes.Any())
        {
            if (sb.Length > 0)
            {
                sb.Append(", ");
                sb.Append("for the");
            }

            // for each loop with index
            foreach (var (label, index) in purposes.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, purposes.Count - 1);
            }

            // append period
            sb.Append('.');
        }

        if (tags.Any())
        {
            sb.Append(" Tags:");
            // for each loop with index
            foreach (var (label, index) in tags.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, tags.Count - 1);
            }

            sb.Append('.');
        }


        if (references.Any())
        {
            sb.Append(" Source:");
            // for each loop with index
            foreach (var (label, index) in references.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, references.Count - 1);
            }

            sb.Append('.');
        }

        if (parallels.Any())
        {
            sb.Append(" See also");
            // for each loop with index
            foreach (var (label, index) in parallels.Select((value, i) => (value, i)))
            {
                sb = SentenceClauseBuilder(index, sb, label, parallels.Count - 1);
            }

            sb.Append('.');
        }


        return sb.ToString().Trim();
    }

    private static StringBuilder SentenceClauseBuilder(int index, StringBuilder sb, string label, int lastIndex)
    {
        if (index > 1)
        {
            sb.Append(',');
        }

        // if it's the last index
        if (index > 0 && index == lastIndex)
        {
            sb.Append(" and");
        }

        sb.Append(' ');
        // to title case
        sb.Append(label);
        return sb;
    }
}
