﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using wallet.Models.Database;

namespace wallet.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20190630104857_add_applicationUserId_column_to_category")]
    partial class add_applicationUserId_column_to_category
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ngWallet.Models.Database.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ApplicationUserId");

                    b.Property<string>("Color");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Categorys");
                });

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

                    b.Property<int?>("CategoryId");

                    b.Property<decimal>("ChangeValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<int>("WalletId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

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
                    b.HasOne("ngWallet.Models.Database.Category")
                        .WithMany("WalletValueChanges")
                        .HasForeignKey("CategoryId");

                    b.HasOne("wallet.Models.Database.Wallet")
                        .WithMany("WalletValueChanges")
                        .HasForeignKey("WalletId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
