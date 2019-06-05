import { createStyles } from "@material-ui/core";

export default ( theme ) => {

  const avatarSize = "144px"

  return createStyles( {
    root: {
      textAlign: "center",
      transform: "",
      marginTop:"18%"
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      boxShadow: "0 4px 12px 0 rgba( 0, 0, 0, .28 )",
      objectFit: "cover",
      borderRadius: "50%"
    },
    name: {
      marginTop: ".88rem",
      fontWeight: "bold"
    },
    email: {
      color: "#ddd"
    }
  } );
};