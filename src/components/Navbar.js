import React from 'react';
import Logo from './Logo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.scss';

function Navbar() {
  return (
    <AppBar position="sticky" className="nav-bar">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className="menu-icon"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Logo />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

//       <nav className="navbar" role="navigation" aria-label="main navigation">
//         <Logo />

//         <div id="navbarBasicExample" className="navbar-menu">
//           <div className="navbar-start">
//             <a href="/" className="navbar-item">
//               Home
//             </a>
//             <a href="/notes" className="navbar-item">
//               Notes
//             </a>
//             <a href="/edit" className="navbar-item">
//               Write
//             </a>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import MoreIcon from '@material-ui/icons/MoreVert';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   toolbar: {
//     minHeight: 128,
//     alignItems: 'flex-start',
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     alignSelf: 'flex-end',
//   },
// }));

// export default function ProminentAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar className={classes.toolbar}>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h5" noWrap>
//             Material-UI
//           </Typography>
//           <IconButton aria-label="search" color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton aria-label="display more actions" edge="end" color="inherit">
//             <MoreIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
