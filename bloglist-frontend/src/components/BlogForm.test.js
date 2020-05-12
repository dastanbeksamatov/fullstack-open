import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('test for the form', () => {
  test('test if form is rendered by change', async () => {
    const addBlog = jest.fn()
    let component
    act(() => {
      component = render(
        <BlogForm addBlog = { addBlog } />
      )
    })
    const { container } = component
    const form = container.querySelector('form')
    const author = container.querySelector('#author')
    const title = container.querySelector('#title')
    const url = container.querySelector('#url')
    const likes = container.querySelector('#likes')

    act(() => {
      fireEvent.change(title, {
        target: { value: 'Testing input' }
      })
    })
    act(() => {
      fireEvent.change(author, {
        target: { value: 'Test Author' }
      })
    })
    act(() => {
      fireEvent.change(url, {
        target: { value: 'test.com' }
      })
    })
    act(() => {
      fireEvent.change(likes, {
        target: { value: 1 }
      })
    })

    act(() => {
      fireEvent.submit(form)
    })

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].author).toBe('Test Author')
  })
})