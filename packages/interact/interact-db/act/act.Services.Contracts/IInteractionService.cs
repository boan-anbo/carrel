using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using act.Repositories.Contracts;
using act.Services.Model;

namespace act.Services.Contracts;

public interface IInteractionService
{
    Task<Interaction> CreateAsync(Interaction interaction);


    Task<Interaction> CreateNewInteraction(string label);

    [Obsolete("Use GraphQL Mutation method instead")]
    Task<Interaction> CreateInteraction(ICollection<Interaction> subjects, string relationType,
        ICollection<Interaction> objects);

    Task<bool> UpdateAsync(Interaction interaction);

    Task<bool> DeleteAsync(int id);

    Task<Interaction> GetAsync(int id);

    Task<bool> Test();

    IQueryable<Interaction> GetAllInteractions();

    public Task UpdateInteractionRelations(
        CreateOrUpdateInteractionRequestDto requestDto,
        Interaction? interaction
    );

    Task updateInteractionSentence(Interaction result);
}
