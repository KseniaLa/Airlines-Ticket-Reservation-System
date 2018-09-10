﻿// <auto-generated />
using System;
using AirlinesApp.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AirlinesApp.DataAccess.Migrations
{
    [DbContext(typeof(AirlinesContext))]
    [Migration("20180903085352_UserTokens")]
    partial class UserTokens
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Default")
                        .IsRequired();

                    b.Property<int>("Rating");

                    b.Property<string>("Url")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Default")
                        .IsRequired();

                    b.Property<int>("Stars");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime");

                    b.Property<int>("DepartureId");

                    b.Property<int>("DestinationId");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("DepartureId", "DestinationId", "DateTime")
                        .IsUnique();

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.IpAddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<string>("IpAddr")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("IpAddresses");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(2);

                    b.HasKey("Id");

                    b.ToTable("Languages");

                    b.HasData(
                        new { Id = 1, Name = "ru" },
                        new { Id = 2, Name = "en" }
                    );
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Count");

                    b.Property<int>("TicketId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("TicketId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .IsRequired();

                    b.Property<int>("CompanyId");

                    b.Property<int>("Count");

                    b.Property<int>("FlightId");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("FlightId", "CompanyId", "Category")
                        .IsUnique();

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Translation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CityId");

                    b.Property<int?>("CompanyId");

                    b.Property<int?>("LanguageId");

                    b.Property<string>("Value")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("LanguageId");

                    b.ToTable("Translations");
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Confirmed");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Token")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new { Id = 1, Confirmed = true, Email = "airlines@ks.la", IsAdmin = true, Name = "airlines", PasswordHash = "ACmEat7zjCDM//KDXxqQugFlUr4TEx82LLtkRch3a9uJGvsB+WRHAs8jqIawzrxwSg==", Surname = "airlines", Token = "notoken" }
                    );
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Flight", b =>
                {
                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.City", "Departure")
                        .WithMany()
                        .HasForeignKey("DepartureId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.City", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.IpAddress", b =>
                {
                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Order", b =>
                {
                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.Ticket", "Ticket")
                        .WithMany("Order")
                        .HasForeignKey("TicketId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Ticket", b =>
                {
                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.Company", "Company")
                        .WithMany("Tickets")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.Flight", "Flight")
                        .WithMany("Tickets")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlinesApp.DataAccess.Models.Entities.Translation", b =>
                {
                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.City", "City")
                        .WithMany("Translations")
                        .HasForeignKey("CityId");

                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.Company", "Company")
                        .WithMany("Translations")
                        .HasForeignKey("CompanyId");

                    b.HasOne("AirlinesApp.DataAccess.Models.Entities.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");
                });
#pragma warning restore 612, 618
        }
    }
}
