"use client";
import UserContext from "@/context/UserContext";
import {
  Avatar,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const ProjectList = ({ data }) => {
  const { data: session } = useSession();
  // Get user initials
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.projectname}</TableCell>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.projecttype}</TableCell>
                <TableCell>
                  <Avatar>{getInitials(session?.user?.name)}</Avatar>
                  {session?.user?.name}
                </TableCell>
                <TableCell>
                  <MoreHorizIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default ProjectList;
