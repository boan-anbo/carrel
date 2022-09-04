using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace act.Repositories.Db;

public class ActDbContext : DbContext
{
    public ActDbContext()
    {
        // const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
        // use project folder for now
        const Environment.SpecialFolder folder = Environment.SpecialFolder.MyDocuments;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "act.db");
        Database.EnsureCreated();
    }

    public string DbPath { get; }


    // interaction table
    public DbSet<Interaction?> Interactions { get; set; }

    // interaction type table
    public DbSet<FirstAct> FirstActs { get; set; }
    public DbSet<SecondAct> SecondActs { get; set; }

    // interaction properties
    public DbSet<Property?> Properties { get; set; }

    // relation tables
    public DbSet<SubjectRelation?> SubjectRelations { get; set; }
    public DbSet<ObjectRelation?> ObjectRelations { get; set; }
    public DbSet<ParallelRelation?> ParallelRelations { get; set; }
    public DbSet<SettingRelation?> SettingRelations { get; set; }
    public DbSet<ReferenceRelation?> ReferenceRelations { get; set; }
    public DbSet<IndirectObjectRelation?> IndirectObjectRelations { get; set; }
    public DbSet<PurposeRelation?> PurposeRelations { get; set; }
    public DbSet<ContextRelation?> ContextRelations { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");

        // ensure the database is created
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // context relations
        modelBuilder.Entity<ContextRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<ContextRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Contexts)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // subject relations
        modelBuilder.Entity<SubjectRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<SubjectRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Subjects)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);


        // Object relations
        modelBuilder.Entity<ObjectRelation>()
            .HasKey(x => x.Uuid);
                

        modelBuilder.Entity<ObjectRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Objects)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);


        // setting relations
        modelBuilder.Entity<SettingRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<SettingRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Settings)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // indirect object relations

        modelBuilder.Entity<IndirectObjectRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<IndirectObjectRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.IndirectObjects)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // purpose relations
        modelBuilder.Entity<PurposeRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<PurposeRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Purposes)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // Parallel relations
        modelBuilder.Entity<ParallelRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<ParallelRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Parallels)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reference relations
        modelBuilder.Entity<ReferenceRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<ReferenceRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.References)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // First act
        modelBuilder.Entity<Interaction>()
            .HasOne<FirstAct>(x => x.FirstAct)
            .WithMany(g => g.Interactions)
            .HasForeignKey(x => x.FirstActId)
            
            .OnDelete(DeleteBehavior.Restrict);
        
        // Second act
        modelBuilder.Entity<Interaction>()
            .HasOne<SecondAct>(x => x.SecondAct)
            .WithMany(g => g.Interactions)
            .HasForeignKey(x => x.SecondActId)
            .OnDelete(DeleteBehavior.Restrict);


        // interaction properties
        modelBuilder.Entity<Property>()
            .HasOne<Interaction>(x => x.Interaction)
            .WithMany(x => x.Properties)
            .HasForeignKey(x => x.InteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<FirstAct>()
            .HasData(
                new FirstAct
                {
                    Id = 1,
                    Label = "to be"
                }
            );

        modelBuilder.Entity<Interaction>()
            .HasData(
                new Interaction
                {
                    Id = 1,
                    Label = "World",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 2,
                    Label = "People",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                // idea 
                new Interaction
                    {
                        Id = 3,
                        Label = "Idea",
                        FirstActId = 1,
                        Identity = InteractionIdentity.ENTITY
                    },
                // creation
                new Interaction
                {
                    Id = 4,
                    Label = "Creation",
                    FirstActId = 1,
                }
            );

        // data seeding for interaction table
        // modelBuilder.ApplyConfiguration(new InteractionTypeConfiguration());
        // modelBuilder.ApplyConfiguration(new InteractionConfiguration());
    }
}