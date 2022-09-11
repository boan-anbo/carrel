using act.Services.Model;
using Microsoft.EntityFrameworkCore;

namespace act.Repositories.Db;

public class InteractDbContext : DbContext
{
    public InteractDbContext()
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

    public DbSet<FirstActRelation?> FirstActRelations { get; set; }
    public DbSet<SecondActRelation?> SecondActRelations { get; set; }

    public DbSet<CategoryRelation> CategoryRelations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}").EnableSensitiveDataLogging();

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
            .OnDelete(DeleteBehavior.Cascade);

        /// reverse relation
        modelBuilder.Entity<SubjectRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsSubjects)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Cascade);

        // first act relations
        modelBuilder.Entity<FirstActRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<FirstActRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.FirstActs)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Cascade);

        // reverse relation
        modelBuilder.Entity<FirstActRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsFirstActs)
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

        // second act relations
        modelBuilder.Entity<SecondActRelation>()
            .HasKey(x => x.Uuid);

        modelBuilder.Entity<SecondActRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.SecondActs)
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

        // category relations
        modelBuilder.Entity<CategoryRelation>()
            .HasKey(x => x.Uuid);
                
        
        modelBuilder.Entity<CategoryRelation>()
            .HasOne(x => x.HostInteraction)
            .WithMany(x => x.Categories)
            .HasForeignKey(x => x.HostInteractionId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // reverse category relation
        
        modelBuilder.Entity<CategoryRelation>()
            .HasOne(x => x.LinkedInteraction)
            .WithMany(x => x.AsCategories)
            .HasForeignKey(x => x.LinkedInteractionId)
            .OnDelete(DeleteBehavior.Restrict);
        

        // interaction properties
        modelBuilder.Entity<Property>()
            .HasOne<Interaction>(x => x.Interaction)
            .WithMany(x => x.Properties)
            .HasForeignKey(x => x.InteractionId)
            .OnDelete(DeleteBehavior.Restrict);


        // configure eager loading for first and second act

        // // first acts alway include the linked act interaction
        // modelBuilder.Entity<FirstActRelation>()
        //     .Navigation(x => x.LinkedInteraction)
        //     .AutoInclude();
        //
        //
        // // second acts alway include the linked act interaction
        // modelBuilder.Entity<SecondActRelation>()
        //     .Navigation(x => x.LinkedInteraction)
        //     .AutoInclude();

            
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
        modelBuilder.Entity<Interaction>()
            .HasData(
                new Interaction
                {
                    Id = 1,
                    Label = "to be",
                    Identity = InteractionIdentity.ACT
                },
                new Interaction
                {
                    Id = 2,
                    Label = "to do",
                    Identity = InteractionIdentity.ACT
                },
                new Interaction
                {
                    Id = 3,
                    Label = "to avoid",
                    Identity = InteractionIdentity.ACT
                },
                new Interaction
                {
                    Id = 4,
                    Label = "to preserve",
                    Identity = InteractionIdentity.ACT
                }
            );

        modelBuilder.Entity<Interaction>()
            .HasData(
                new Interaction
                {
                    Id = 5,
                    Label = "Air pollution",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 6,
                    Label = "I",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 7,
                    Label = "you",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 8,
                    Label = "plastic bottles",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 9,
                    Label = "the environment",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 10,
                    Label = "future",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 11,
                    Label = "earth",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 12,
                    Label = "common sense",
                    Identity = InteractionIdentity.ENTITY
                },
                new Interaction
                {
                    Id = 13,
                    Label = "climate change",
                    Identity = InteractionIdentity.ENTITY
                }
            );

        /// a synthesis of the above entities and acts
        modelBuilder.Entity<Interaction>().HasData(
            new Interaction
            {
                Id = 14,
                Label = "In the world, You and I avoid plastic bottle to save the environment on earth for the future",
                Identity = InteractionIdentity.INTERACTION,
            }
        );

        // /// add context relations
        modelBuilder.Entity<ContextRelation>().HasData(
            new ContextRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 5,
                Type = RelationTypes.ContextRelation,
            }
        );

        // add subject relations
        modelBuilder.Entity<SubjectRelation>().HasData(
            new SubjectRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 6,
                Type = RelationTypes.SubjectRelation,
            },
            new SubjectRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 7,
                Type = RelationTypes.SubjectRelation,
            }
        );

        // add first act relations
        modelBuilder.Entity<FirstActRelation>().HasData(
            new FirstActRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 3,
                Type = RelationTypes.FirstActRelation,
            }
        );

        // add object relations
        modelBuilder.Entity<ObjectRelation>().HasData(
            new ObjectRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 8,
                Type = RelationTypes.ObjectRelation,
            }
        );

        // add second act relations
        modelBuilder.Entity<SecondActRelation>().HasData(
            new SecondActRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 4,
                Type = RelationTypes.SecondActRelation,
            }
        );


        // add indirect object relations

        modelBuilder.Entity<IndirectObjectRelation>().HasData(
            new IndirectObjectRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 9,
                Type = RelationTypes.IndirectObjectRelation,
            }
        );

        // add purpose relations

        modelBuilder.Entity<PurposeRelation>().HasData(
            new PurposeRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 10,
                Type = RelationTypes.PurposeRelation,
            }
        );

        // add setting relations

        modelBuilder.Entity<SettingRelation>().HasData(
            new SettingRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 11,
                Type = RelationTypes.SettingRelation,
            }
        );

        // add reference relations

        modelBuilder.Entity<ReferenceRelation>().HasData(
            new ReferenceRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 12,
                Type = RelationTypes.ReferenceRelation,
            }
        );

        // add parallel relations

        modelBuilder.Entity<ParallelRelation>().HasData(
            new ParallelRelation
            {
                Uuid = Guid.NewGuid(),
                HostInteractionId = 14,
                LinkedInteractionId = 13,
                Type = RelationTypes.ParallelRelation,
            }
        );


        // data seeding for interaction table
        // modelBuilder.ApplyConfiguration(new InteractionTypeConfiguration());
        // modelBuilder.ApplyConfiguration(new InteractionConfiguration());
    }
}