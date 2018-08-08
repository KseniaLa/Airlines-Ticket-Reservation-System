﻿// <auto-generated />
using System;
using AirlinesTicketsReservationApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AirlinesTicketsReservationApp.Models.Migrations
{
    [DbContext(typeof(AirlinesContext))]
    partial class AirlinesContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Rating");

                    b.HasKey("Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Models.CityTranslate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CityId");

                    b.Property<int?>("CompanyId");

                    b.Property<int>("LanguageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("LanguageId");

                    b.ToTable("CityTranslate");
                });

            modelBuilder.Entity("Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Stars");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Models.CompanyTranslate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CompanyId");

                    b.Property<int>("LanguageId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("LanguageId");

                    b.ToTable("CompanyTranslate");
                });

            modelBuilder.Entity("Models.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<int>("DepartureId");

                    b.Property<int>("DestinationId");

                    b.Property<TimeSpan>("Time");

                    b.HasKey("Id");

                    b.HasIndex("DepartureId");

                    b.HasIndex("DestinationId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("Models.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(2);

                    b.HasKey("Id");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("Models.Order", b =>
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

            modelBuilder.Entity("Models.Ticket", b =>
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

                    b.HasIndex("FlightId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired();

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired();

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Models.CityTranslate", b =>
                {
                    b.HasOne("Models.City", "City")
                        .WithMany("CityTranslates")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.Company")
                        .WithMany("CompanyTranslates")
                        .HasForeignKey("CompanyId");

                    b.HasOne("Models.Language", "Language")
                        .WithMany("CityTranslates")
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.CompanyTranslate", b =>
                {
                    b.HasOne("Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.Language", "Language")
                        .WithMany("CompanyTranslates")
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.Flight", b =>
                {
                    b.HasOne("Models.City", "Departure")
                        .WithMany()
                        .HasForeignKey("DepartureId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.City", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.SetNull);
                });

            modelBuilder.Entity("Models.Order", b =>
                {
                    b.HasOne("Models.Ticket", "Ticket")
                        .WithMany("Order")
                        .HasForeignKey("TicketId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.User", "User")
                        .WithMany("Order")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.Ticket", b =>
                {
                    b.HasOne("Models.Company", "Company")
                        .WithMany("Tickets")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.Flight", "Flight")
                        .WithMany("Tickets")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
