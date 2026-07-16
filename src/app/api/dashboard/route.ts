import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.count();

    const projects = await prisma.project.findMany();

    const tasks = await prisma.task.findMany();

    const revenue = projects.reduce(
      (sum: any, project: any) => sum + (project.budget ?? 0),
      0
    );

    const statusCounts = {
      Lead: 0,
      "Proposal Sent": 0,
      "In Progress": 0,
      Testing: 0,
      Completed: 0,
    };

    projects.forEach((project: any) => {
      if (project.status in statusCounts) {
        statusCounts[
          project.status as keyof typeof statusCounts
        ]++;
      }
    });

    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        client: true,
      },
    });

    const recentTasks = await prisma.task.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        project: true,
      },
    });

    const recentClients = await prisma.client.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      clients,
      projects: projects.length,
      tasks: tasks.length,
      revenue,
      statusCounts,
      recentProjects,
      recentTasks,
      recentClients,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Dashboard API Error" },
      { status: 500 }
    );
  }
}