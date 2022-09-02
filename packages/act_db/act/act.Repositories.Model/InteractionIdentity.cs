using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace act.Services.Model
{
    /// <summary>
    /// This describes the identity of the interaction. Three types identities: Entity (person, etc.), Act (interaction), Source (Source for the interaction).
    /// </summary>
    /// <remarks>
    /// <para>
    /// Since the db is act-based and has no identity per se, this is only a convenient helper to identify a specific kind of interaction: for something to exists, which means to claim an identity.
    /// </para>
    /// <para>
    /// So <see cref="InteractionIdentity"/>.Entity must be the creation act of the name.
    /// </para>
    /// </remarks>
    public enum InteractionIdentity
    {
        ENTITY,
        ACT,
        SOURCE
    }
    
}