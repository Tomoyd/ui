import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonProps, ButtonType } from './Button';

const buttonProps = {
  onClick: jest.fn(),
};

const linkProps: ButtonProps = {
  href: 'www.baidu.com',
  btnType: ButtonType.Link,
  children: 'hello',
};

const disabledProps: ButtonProps = {
  children: 'hello',
  onClick: jest.fn(),
  disabled: true,
};

describe('testing component Button case', () => {
  it('render correct base props', () => {
    render(<Button {...buttonProps}>hello</Button>);
    const element = screen.getByText('hello');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn');
    fireEvent.click(element);
    expect(buttonProps.onClick).toHaveBeenCalled();
  });

  it('render link props', () => {
    render(<Button {...linkProps} />);
    const element = screen.getByText('hello') as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element.href).toBeTruthy();
  });

  it('testing disabled props', () => {
    render(<Button {...disabledProps} />);
    const element = screen.getByText('hello') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(buttonProps.onClick).not.toHaveBeenCalled();
  });
});
