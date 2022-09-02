using System;

namespace act.API.DataContracts.Requests
{
    public class UserCreationRequest
    {
        public DateTime Date { get; set; }

        public InteractionDto InteractionDto { get; set; }
    }
}
