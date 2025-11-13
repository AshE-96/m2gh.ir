import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface CommentData {
  id: string
  article_id: string
  name: string
  email: string
  comment: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, article_id, name, email, comment } = body

    if (action !== 'submit_comment') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!name || !email || !comment || !article_id) {
      return NextResponse.json(
        { error: 'Name, email, comment and article_id are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create comment data
    const commentData: CommentData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      article_id,
      name,
      email,
      comment,
      date: new Date().toISOString(),
      status: 'pending'
    }

    // Save to pending_comments.json file
    const pendingCommentsFilePath = path.join(process.cwd(), 'src/data/pending_comments.json')

    let pendingComments: CommentData[] = []
    try {
      const pendingCommentsData = fs.readFileSync(pendingCommentsFilePath, 'utf8')
      pendingComments = JSON.parse(pendingCommentsData)
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      pendingComments = []
    }

    pendingComments.push(commentData)

    // Write back to file
    fs.writeFileSync(pendingCommentsFilePath, JSON.stringify(pendingComments, null, 2))

    return NextResponse.json(
      { 
        message: 'Comment submitted successfully and is pending admin approval',
        id: commentData.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('article_id')

    const commentsFilePath = path.join(process.cwd(), 'src/data/comments.json')

    let comments: CommentData[] = []
    try {
      const commentsData = fs.readFileSync(commentsFilePath, 'utf8')
      comments = JSON.parse(commentsData)
    } catch (error) {
      comments = []
    }

    // Filter by article_id if provided, and only return approved comments
    let filteredComments = comments.filter(
      (comment) => comment.status === 'approved'
    )

    if (articleId) {
      filteredComments = filteredComments.filter(
        (comment) => comment.article_id === articleId || comment.article_id === 'default'
      )
    }

    return NextResponse.json(filteredComments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

