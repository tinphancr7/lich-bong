import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: any;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
const Button: React.FC<ButtonProps> = ({
  className,
  icon: Icon,
  href,
  children,
  type = 'button',
  onClick,
}) => {
  return (
    <>
      {href ? (
        <Link
          to={href}
          className={`flex items-center justify-center gap-2 ${className}`}
        >
          {Icon && <Icon size={20} />}
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={twMerge(
            `rounded-lg flex items-center justify-center gap-1 text-[13px] font-medium ${className}`,
          )}
          onClick={onClick}
        >
          {Icon && <Icon size={20} />}
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
