using act.Services.Model;
using Microsoft.EntityFrameworkCore;


namespace act.Repositories.Db
{
    public class ActDbContext : DbContext
    {
        public string DbPath { get; }

        public ActDbContext()
        {
            const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = Path.Join(path, "act.db");
            this.Database.EnsureCreated();
        }


        // interaction table
        public DbSet<Interaction> Interactions { get; set; }

        // interaction type table
        public DbSet<InteractionType> InteractionTypes { get; set; }

        // interaction properties
        public DbSet<Property?> Properties { get; set; }

        // relation tables
        public DbSet<SubjectRelation?> SubjectRelations { get; set; }
        public DbSet<ObjectRelation?> ObjectRelations { get; set; }
        public DbSet<ParallelRelation?> ParallelRelations { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite($"Data Source={DbPath}");

            // ensure the database is created
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SubjectRelation>()
                .HasKey(x => new { SubjectId = x.HostInteractionId, ObjectId = x.LinkedInteractionId });

            modelBuilder.Entity<SubjectRelation>()
                .HasOne(x => x.HostInteraction)
                .WithMany(x => x.Subjects)
                .HasForeignKey(x => x.HostInteractionId)
                .OnDelete(DeleteBehavior.Restrict);


            // Object relations
            modelBuilder.Entity<ObjectRelation>()
                .HasKey(x => new { SubjectId = x.HostInteractionId, ObjectId = x.LinkedInteractionId });

            modelBuilder.Entity<ObjectRelation>()
                .HasOne(x => x.HostInteraction)
                .WithMany(x => x.Objects)
                .HasForeignKey(x => x.HostInteractionId)
                .OnDelete(DeleteBehavior.Restrict);


            // Parallel relations
            modelBuilder.Entity<ParallelRelation>()
                .HasKey(x => new { SubjectId = x.HostInteractionId, ObjectId = x.LinkedInteractionId });

            modelBuilder.Entity<ParallelRelation>()
                .HasOne(x => x.HostInteraction)
                .WithMany(x => x.Related)
                .HasForeignKey(x => x.HostInteractionId)
                .OnDelete(DeleteBehavior.Restrict);

            // interaction type
            modelBuilder.Entity<Interaction>()
                .HasOne<InteractionType>(x => x.Type)
                .WithMany(g => g.Interactions)
                .HasForeignKey(x => x.TypeId)
                .OnDelete(DeleteBehavior.Restrict);


            // interaction properties
            modelBuilder.Entity<Property>()
                .HasOne<Interaction>(x => x.Interaction)
                .WithMany(x => x.Properties)
                .HasForeignKey(x => x.InteractionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<InteractionType>()
                .HasData(
                    new InteractionType
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
                        TypeId = 1,
                        Identity = InteractionIdentity.ENTITY
                    },
                    new Interaction
                    {
                        Id = 2,
                        Label = "People",
                        TypeId = 1,
                        Identity = InteractionIdentity.ENTITY
                    }
                );

            // data seeding for interaction table
            // modelBuilder.ApplyConfiguration(new InteractionTypeConfiguration());
            // modelBuilder.ApplyConfiguration(new InteractionConfiguration());
        }
    }
}