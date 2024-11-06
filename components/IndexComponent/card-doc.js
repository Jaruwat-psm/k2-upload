import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";

export default function CardIndexComponent() {
  const Documents = [
    { DocumentNumber: 1, DocmentName: "Document 1", FileName: 'Doc1' },
    { DocumentNumber: 2, DocmentName: "Document 2", FileName: 'Doc2' },
    { DocumentNumber: 3, DocmentName: "Document 3", FileName: 'Doc3' },
    { DocumentNumber: 4, DocmentName: "Document 4", FileName: 'Doc4' },
    { DocumentNumber: 5, DocmentName: "Document 5", FileName: 'Doc5' },
    { DocumentNumber: 6, DocmentName: "Document 6", FileName: 'Doc6' },
  ];
  return (
    <Grid2 container spacing={2}>
      {Documents.map((item, index) => (
        <>
      <Grid2
        size={{ xs: 12, md: 4, lg: 3 }}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box sx={{ width: '100%' }}>
          <Card variant="outlined">
          <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {item.DocumentNumber}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {item.DocmentName}
        </Typography>
        <Typography variant="body2">
          {item.FileName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open Document</Button>
      </CardActions>
          </Card>
        </Box>
      </Grid2>
      </>
        ))}
    </Grid2>
  );
}
