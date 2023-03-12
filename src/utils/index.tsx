import React from 'react'

export const renderComponent = (
  Component?: React.ElementType,
  props?: object,
) => (Component ? <Component {...props} /> : null)
