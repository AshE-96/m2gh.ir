import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Project } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    const projectsFilePath = path.join(process.cwd(), 'src/data/projects.json')

    let projects: Project[] = []
    try {
      const projectsData = fs.readFileSync(projectsFilePath, 'utf8')
      projects = JSON.parse(projectsData)
    } catch (error) {
      projects = []
    }

    // Filter projects based on query parameters
    let filteredProjects = projects

    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(project =>
        project.category.includes(category)
      )
    }

    if (status && status !== 'all') {
      filteredProjects = filteredProjects.filter(project =>
        project.status === status
      )
    }

    return NextResponse.json(filteredProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
