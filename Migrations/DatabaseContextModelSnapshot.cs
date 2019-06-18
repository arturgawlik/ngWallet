﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using wallet.Models.Database;

namespace wallet.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("wallet.Models.Database.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirebaseUserIdentity");

                    b.HasKey("Id");

                    b.ToTable("ApplicationUsers");
                });

            modelBuilder.Entity("wallet.Models.Database.Wallet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ApplicationUserId");

                    b.Property<string>("Description");

                    b.Property<bool>("FastAccess");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("Wallets");
                });

            modelBuilder.Entity("wallet.Models.Database.WalletValueChange", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("ChangeValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<int>("WalletId");

                    b.HasKey("Id");

                    b.HasIndex("WalletId");

                    b.ToTable("WalletValueChanges");
                });

            modelBuilder.Entity("wallet.Models.Database.Wallet", b =>
                {
                    b.HasOne("wallet.Models.Database.ApplicationUser")
                        .WithMany("Wallets")
                        .HasForeignKey("ApplicationUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("wallet.Models.Database.WalletValueChange", b =>
                {
                    b.HasOne("wallet.Models.Database.Wallet")
                        .WithMany("WalletValueChanges")
                        .HasForeignKey("WalletId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
