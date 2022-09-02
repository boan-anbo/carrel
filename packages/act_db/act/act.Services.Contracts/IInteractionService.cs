using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using act.Services.Model;

namespace act.Services.Contracts
{
    public interface IInteractionService
    {
        Task<Interaction> CreateAsync(Interaction interaction);


        Task<Interaction> CreateNewInteraction(String label);
        
        Task<Interaction> CreateInteraction(ICollection<Interaction> subjects, String relationType, ICollection<Interaction> objects);

        Task<bool> UpdateAsync(Interaction interaction);

        Task<bool> DeleteAsync(int id);

        Task<Interaction> GetAsync(int id);

        Task<Boolean> Test();

        IQueryable<Interaction> GetAllInteractions();
    }
}
