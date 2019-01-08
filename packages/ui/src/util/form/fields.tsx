import * as React from 'react'
import { Collapse } from 'react-collapse'
import { Form, Message } from 'semantic-ui-react'

/**
 * renderField is common react-form pattern to pipe data into custom Field.
 * {@link http://redux-form.com/6.3.1/examples/fieldLevelValidation/}
 * @param param {object} opts redux-form injected state
 * @returns {Componenent} component
 */
export function renderField (param: any) {
  const {
    hidden,
    input,
    label,
    type,
    disabled,
    placeholder,
    className,
    min,
    max,
    autoFocus,
    meta: { touched, error, pristine }
  } = param
  const style = hidden ? { display: 'none' } : {}
  return (
    <Form.Field style={{ ...style }}>
      <Form.Input
        disabled={disabled}
        className={className}
        label={label}
        placeholder={placeholder}
        type={type}
        error={touched && !pristine && !!error} // the !pristine bit here is to stop the field going red on cancel, but it might be overkill when what we want is this disabled if the form is being cancelled.
        autoFocus={autoFocus}
        {...input}
        min={min}
        max={max}
      />
      <Collapse isOpened={touched && !!error}>
        <Message
          error
          data-test={`input-error-${error}`.replace(/\s+/g, '-')}
          header='Field invalid!'
          content={error || ' '}
        />
      </Collapse>
    </Form.Field>
  )
}
