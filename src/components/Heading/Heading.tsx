import React from 'react';
interface HeadingProps {
  children: React.ReactNode;
}
const Heading = ({ children }: HeadingProps) => {
  return (
    <div className="text-xl font-semibold capitalize mb-4">{children}</div>
  );
};

export default Heading;
