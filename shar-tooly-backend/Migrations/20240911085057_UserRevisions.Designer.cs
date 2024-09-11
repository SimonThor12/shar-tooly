﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using shar_tooly_backend.Data;

#nullable disable

namespace shar_tooly_backend.Migrations
{
    [DbContext(typeof(ToolContext))]
    [Migration("20240911085057_UserRevisions")]
    partial class UserRevisions
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("SharToolyBackend.Models.Tool", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("OwnerId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId1")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("UserId1");

                    b.ToTable("Tools");
                });

            modelBuilder.Entity("SharToolyBackend.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SharToolyBackend.Models.Tool", b =>
                {
                    b.HasOne("SharToolyBackend.Models.User", null)
                        .WithMany("OwnedTools")
                        .HasForeignKey("UserId");

                    b.HasOne("SharToolyBackend.Models.User", null)
                        .WithMany("RentedTools")
                        .HasForeignKey("UserId1");
                });

            modelBuilder.Entity("SharToolyBackend.Models.User", b =>
                {
                    b.Navigation("OwnedTools");

                    b.Navigation("RentedTools");
                });
#pragma warning restore 612, 618
        }
    }
}
