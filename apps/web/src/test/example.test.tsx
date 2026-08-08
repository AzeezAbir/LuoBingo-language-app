import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Vitest & React Testing Library', () => {
  it('renders button element correctly', () => {
    render(<button type="button">Click Me</button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
  })
})
