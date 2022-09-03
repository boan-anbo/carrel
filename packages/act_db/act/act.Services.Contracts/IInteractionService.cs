using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using act.Services.Model;

namespace act.Services.Contracts;

public interface IInteractionService
{
    Task<Interaction> CreateAsync(Interaction interaction);


    Task<Interaction> CreateNewInteraction(string label);

    Task<Interaction> CreateInteraction(ICollection<Interaction> subjects, string relationType,
        ICollection<Interaction> objects);

    Task<bool> UpdateAsync(Interaction interaction);

    Task<bool> DeleteAsync(int id);

    Task<Interaction> GetAsync(int id);

    Task<bool> Test();

    IQueryable<Interaction> GetAllInteractions();
}