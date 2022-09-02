using act.Repositories.Db;
using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace act.API.Tests.Fixture;

public class TestDatabaseFixture
{

    private static readonly object _lock = new();
    private static bool _databaseInitialized;
    
    public TestDatabaseFixture()
    {
        lock (_lock)
        {
            if (!_databaseInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();

                    var interaction = new Interaction { Description = "Test Interaction" };
                    context.AddRange(
                        interaction
                        );
                    context.SaveChanges();
                }

                _databaseInitialized = true;
            }
        }
    }

    public ActDbContext CreateContext()
    {
        return new ActDbContext();
    }
}