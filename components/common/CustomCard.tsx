import Link from "next/link";
import React, { ReactNode } from "react";
import Card from "react-bootstrap/Card";

const CustomCard: React.FC<{
  url?: string;
  children: ReactNode;
}> = (props) => {
  return (
    <Card className="custom-card" body>
      {props.children}
    </Card>
  );
};

export default CustomCard;
