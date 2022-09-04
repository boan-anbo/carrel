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

        // reverse navigation
        modelBuilder.Entity<ContextRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsContexts)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // subject relations
        modelBuilder.Entity<SubjectRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<SubjectRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Subjects)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        /// reverse relation
        modelBuilder.Entity<SubjectRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsSubjects)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // Object relations
        modelBuilder.Entity<ObjectRelation>()
            .HasKey(x => x.Uuid);


        modelBuilder.Entity<ObjectRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Objects)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reverse relation
        modelBuilder.Entity<ObjectRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsObjects)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);


        // setting relations
        modelBuilder.Entity<SettingRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<SettingRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Settings)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reverse setting relation

        modelBuilder.Entity<SettingRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsSettings)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);


        // indirect object relations

        modelBuilder.Entity<IndirectObjectRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<IndirectObjectRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.IndirectObjects)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reverse indrect object relation

        modelBuilder.Entity<IndirectObjectRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsIndirectObjects)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // purpose relations
        modelBuilder.Entity<PurposeRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<PurposeRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Purposes)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reverse purpose relation
        modelBuilder.Entity<PurposeRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsPurposes)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // Parallel relations
        modelBuilder.Entity<ParallelRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<ParallelRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Parallels)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reverse parallel relation
        modelBuilder.Entity<ParallelRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsParallels)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);

        // reference relations
        modelBuilder.Entity<ReferenceRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<ReferenceRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.References)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);


        // reverse reference relation
        modelBuilder.Entity<ReferenceRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsReferences)
            .HasForeignKey(x => x.LinkedInteractionId)
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

        // configure eager loading for first and second act
        modelBuilder.Entity<Interaction>()
            .Navigation(x => x.FirstAct)
            .AutoInclude();

        modelBuilder.Entity<Interaction>()
            .Navigation(x => x.SecondAct)
            .AutoInclude();

        // Create a sample sentence representation.

        // Context: Air pollution

        // Subjects: I, you

        // First Act: to avoid
        // Objects: plastic bottles

        // Second Act: to preserve
        // Indirect Objects: the environment

        // Purpose: for the future

        // Settings: on the earth
        // Reference: common sense
        // Parallel: climate change
        modelBuilder.Entity<FirstAct>()
            .HasData(
                new FirstAct
                {
                    Id = 1,
                    Label = "to be"
                },
                new FirstAct
                {
                    Id = 2,
                    Label = "to avoid"
                },
                new FirstAct
                {
                    Id = 3,
                    Label = "to preserve"
                }
            );

        modelBuilder.Entity<Interaction>()
            .HasData(
                new Interaction
                {
                    Id = 1,
                    Label = "Air pollution",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 2,
                    Label = "I",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 3,
                    Label = "you",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 4,
                    Label = "plastic bottles",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 5,
                    Label = "the environment",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 6,
                    Label = "future",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 7,
                    Label = "earth",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 8,
                    Label = "common sense",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 9,
                    Label = "climate change",
                    FirstActId = 1,
                    Identity = InteractionIdentity.ENTITY
                }
            );

        // data seeding for interaction table
        // modelBuilder.ApplyConfiguration(new InteractionTypeConfiguration());
        // modelBuilder.ApplyConfiguration(new InteractionConfiguration());
    }
}