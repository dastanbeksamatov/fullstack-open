import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('tests for blog rendering', () => {
  test('only author and title is defined', () => {

    const blog = {
      title: 'Test article',
      author: 'Test author',
      url: 'https://test.com',
      likes: 3
    }

    const component = render(
      <Blog blog={ blog } />
    )

    const notDisplayed = component.container.querySelector('.toggledContent')

    expect(component.container.querySelector('.default')).toHaveTextContent('Test article')
    expect(component.container.querySelector('.default')).toHaveTextContent('Test author')
    expect(notDisplayed).toHaveStyle('display: none')

  })

  test('other details of blog are shown when button is clicked', () => {
    const blog = {
      title: 'Test article',
      author: 'Test author',
      url: 'https://test.com',
      likes: 3
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={ blog } addLike={ mockHandler }/>
    )
    fireEvent.click(component.getByText('view'))
    expect(component.container.querySelector('.toggledContent')).toHaveTextContent('likes')
    expect(component.container.querySelector('.default')).toHaveStyle('display: none')
    expect(component.container.querySelector('.toggledContent')).not.toHaveStyle('display: none')
  })
  // uncomment this to test if the button is called

  test('when like button is clicked twice', () => {
    const blog = {
      title: 'Test article',
      author: 'Test author',
      url: 'https://test.com',
      likes: 3
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={ blog } addLike={ mockHandler }/>
    )
    fireEvent.click(component.getByText('view'))
    fireEvent.click(component.getByText(/^like$/))
    fireEvent.click(component.getByText(/^like$/))
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})