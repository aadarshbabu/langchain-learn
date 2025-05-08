import { Document } from "@langchain/core/documents";

export const doc = new Document({
  pageContent: `Card
Cards contain content and actions about a single subject.
figma
For Figma. A large UI kit with over 600 handcrafted Material UI, MUI X, Joy UI components 🎨.
ad by MUI

Introduction

Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:

Card: a surface-level container for grouping related components.
Card Content: the wrapper for the Card content.
Card Header: an optional wrapper for the Card header.
Card Media: an optional container for displaying images, videos, etc.
Card Actions: an optional wrapper that groups a set of buttons.
Card Action Area: an optional wrapper that allows users to interact with the specified area of the Card.
Word of the Day

be•nev•o•lent
adjective

well meaning and kindly.
"a benevolent smile"

Basics

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

Copy
Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are meant to be entry points to more complex and detailed information.

Outlined Card

Set variant="outlined" to render an outlined card.

Word of the Day

be•nev•o•lent
adjective

well meaning and kindly.
"a benevolent smile"

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
Press Enter to start editing
Complex Interaction

On desktop, card content can expand. (Click the downward chevron to view the recipe.)

Shrimp and Chorizo Paella
September 14, 2016
Paella dish
This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
Press Enter to start editing
Media

Example of a card using an image to reinforce the content.

Lizard
Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
Press Enter to start editing
By default, we use the combination of a <div> element and a background image to display the media. It can be problematic in some situations, for example, you might want to display a video or a responsive image. Use the component prop for these use cases:

green iguana
Lizard
Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
Press Enter to start editing
Primary action

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a CardActionArea component.


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
Press Enter to start editing
A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
Press Enter to start editing
UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

Live From Space
Mac Miller
Live from space album cover
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
Press Enter to start editing
Active state styles

To customize a Card's styles when it's in an active state, you can attach a data-active attribute to the Card Action Area component and apply styles with the &[data-active] selector, as shown below:




🎨 If you are looking for inspiration, you can check MUI Treasury's customization examples.

API

See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.

<Card />
<CardActionArea />
<CardActions />
<CardContent />
<CardHeader />
<CardMedia />
<Collapse />
<Paper />
",
  `,
});

export const doc1 = new Document({
  pageContent: `Card
React card component provides a flexible and extensible container for displaying content. Card is delivered with a bunch of variants and options.

Other Frameworks
CoreUI components are available as native Angular, Bootstrap (Vanilla JS), and Vue components. To learn more please visit the following pages.

Angular Card
Bootstrap Card
Vue Card
On this page
About
Example
Content types
Body
Titles, text, and links
Images
List groups
Kitchen sink
Header and footer
Sizing
Using grid markup
Using utilities
Using custom CSS
Text alignment
Navigation
Images
Image caps
Image overlays
Horizontal
Card styles
Background and color
Border
Top border
Card layout
Card groups
Grid cards
API
About#
A react card component is a content container. It incorporates options for images, headers, and footers, a wide variety of content, contextual background colors, and excellent display options.

Example#
Cards are built with as little markup and styles as possible but still manage to deliver a bunch of control and customization. Built with flexbox, they offer easy alignment and mix well with other CoreUI components. Cards have no top, left, and right margins by default, so use spacing utilities as needed. They have no fixed width to start, so they'll fill the full width of its parent.

Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they'll naturally fill the full width of its parent element.


Card title
Some quick example text to build on the card title and make up the bulk of the card's content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

export const CardExample = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardImage orientation="top" src={'/images/react.jpg'} />
      <CCardBody>
        <CCardTitle>Card title</CCardTitle>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </CCardText>
        <CButton color="primary" href="#">
          Go somewhere
        </CButton>
      </CCardBody>
    </CCard>
  )
}

Content types#
CoreUI card supports a wide variety of content, including images, text, list groups, links, and more. Below are examples of those elements.

Body#
The main block of a card is the <CCardBody>. Use it whenever you need a padded section within a card.

This is some text within a card body.
JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody } from '@coreui/react'

export const CardBodyExample = () => {
  return (
    <CCard>
      <CCardBody>This is some text within a card body.</CCardBody>
    </CCard>
  )
}

Titles, text, and links#
Card titles are managed by <CCardTitle> component. Identically, links are attached and collected next to each other by <CCardLink> component.

Subtitles are managed by <CCardSubtitle> component. If the <CCardTitle> also, the <CCardSubtitle> items are stored in a <CCardBody> item, the card title, and subtitle are arranged rightly.

Card title
Card subtitle
Some quick example text to build on the card title and make up the bulk of the card's content.

Card linkAnother link
JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardLink, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react'

export const CardTitleExample = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardBody>
        <CCardTitle>Card title</CCardTitle>
        <CCardSubtitle className="mb-2 text-body-secondary">Card subtitle</CCardSubtitle>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </CCardText>
        <CCardLink href="#">Card link</CCardLink>
        <CCardLink href="#">Another link</CCardLink>
      </CCardBody>
    </CCard>
  )
}

Images#
orientation="top" places a picture to the top of the card. With <CCardText>, text can be added to the card. Text within <CCardText> can additionally be styled with the regular HTML tags.


Some quick example text to build on the card title and make up the bulk of the card's content.

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardImage, CCardText } from '@coreui/react'

export const CardImagesExample = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardImage orientation="top" src={'/images/react.jpg'} />
      <CCardBody>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </CCardText>
      </CCardBody>
    </CCard>
  )
}

List groups#
Create lists of content in a card with a flush list group.

Cras justo odio
Dapibus ac facilisis in
Vestibulum at eros
JavaScript
TypeScript
import React from 'react'
import { CCard, CListGroup, CListGroupItem } from '@coreui/react'

export const CardListGroupsExample = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CListGroup flush>
        <CListGroupItem>Cras justo odio</CListGroupItem>
        <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
        <CListGroupItem>Vestibulum at eros</CListGroupItem>
      </CListGroup>
    </CCard>
  )
}

Header
Cras justo odio
Dapibus ac facilisis in
Vestibulum at eros
JavaScript
TypeScript
import React from 'react'
import { CCard, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'

export const CardListGroups2Example = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardHeader>Header</CCardHeader>
      <CListGroup flush>
        <CListGroupItem>Cras justo odio</CListGroupItem>
        <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
        <CListGroupItem>Vestibulum at eros</CListGroupItem>
      </CListGroup>
    </CCard>
  )
}

Cras justo odio
Dapibus ac facilisis in
Vestibulum at eros
Footer
JavaScript
TypeScript
import React from 'react'
import { CCard, CCardFooter, CListGroup, CListGroupItem } from '@coreui/react'

export const CardListGroups3Example = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CListGroup flush>
        <CListGroupItem>Cras justo odio</CListGroupItem>
        <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
        <CListGroupItem>Vestibulum at eros</CListGroupItem>
      </CListGroup>
      <CCardFooter>Footer</CCardFooter>
    </CCard>
  )
}

Kitchen sink#
Combine and match many content types to build the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.


Card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Cras justo odio
Dapibus ac facilisis in
Vestibulum at eros
Card linkAnother link
JavaScript
TypeScript
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardLink,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

export const CardKitchenSinkExample = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardImage orientation="top" src={'/images/react.jpg'} />
      <CCardBody>
        <CCardTitle>Card title</CCardTitle>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </CCardText>
      </CCardBody>
      <CListGroup flush>
        <CListGroupItem>Cras justo odio</CListGroupItem>
        <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
        <CListGroupItem>Vestibulum at eros</CListGroupItem>
      </CListGroup>
      <CCardBody>
        <CCardLink href="#">Card link</CCardLink>
        <CCardLink href="#">Another link</CCardLink>
      </CCardBody>
    </CCard>
  )
}

Header and footer#
Add an optional header and/or footer within a card.

Header
Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from '@coreui/react'

export const CardHeaderExample = () => {
  return (
    <CCard>
      <CCardHeader>Header</CCardHeader>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CCardText>
          With supporting text below as a natural lead-in to additional content.
        </CCardText>
        <CButton color="primary" href="#">
          Go somewhere
        </CButton>
      </CCardBody>
    </CCard>
  )
}

Card headers can be styled by adding ex. as="h5".

Header
Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from '@coreui/react'

export const CardHeader2Example = () => {
  return (
    <CCard>
      <CCardHeader as="h5">Header</CCardHeader>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CCardText>
          With supporting text below as a natural lead-in to additional content.
        </CCardText>
        <CButton color="primary" href="#">
          Go somewhere
        </CButton>
      </CCardBody>
    </CCard>
  )
}

Quote
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.

Someone famous in Source Title
JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

export const CardHeader3Example = () => {
  return (
    <CCard>
      <CCardHeader>Quote</CCardHeader>
      <CCardBody>
        <blockquote className="blockquote mb-0">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </CCardBody>
    </CCard>
  )
}

Header
Special title treatment
With supporting text below as a natural lead-in to additional content.

2 days ago
JavaScript
TypeScript
import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react'

export const CardHeaderAndFooterExample = () => {
  return (
    <CCard className="text-center">
      <CCardHeader>Header</CCardHeader>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CCardText>
          With supporting text below as a natural lead-in to additional content.
        </CCardText>
        <CButton color="primary" href="#">
          Go somewhere
        </CButton>
      </CCardBody>
      <CCardFooter className="text-body-secondary">2 days ago</CCardFooter>
    </CCard>
  )
}

Sizing#
Cards assume no specific width to start, so they'll be 100% wide unless otherwise stated. You can adjust this as required with custom CSS, grid classes, grid Sass mixins, or services.

Using grid markup#
Using the grid, wrap cards in columns and rows as needed.

Special title treatment
With supporting text below as a natural lead-in to additional content.

Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const CardSizingExample = () => {
  return (
    <CRow>
      <CCol sm={6}>
        <CCard>
          <CCardBody>
            <CCardTitle>Special title treatment</CCardTitle>
            <CCardText>
              With supporting text below as a natural lead-in to additional content.
            </CCardText>
            <CButton color="primary" href="#">Go somewhere</CButton>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6}>
        <CCard>
          <CCardBody>
            <CCardTitle>Special title treatment</CCardTitle>
            <CCardText>
              With supporting text below as a natural lead-in to additional content.
            </CCardText>
            <CButton color="primary" href="#">Go somewhere</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Using utilities#
Use some of available sizing utilities to rapidly set a card's width.

Card title
With supporting text below as a natural lead-in to additional content.

Card title
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'

export const CardSizing2Example = () => {
  return (
    <>
      <CCard className="w-75 mb-3">
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CButton color="primary" href="#">
            Go somewhere
          </CButton>
        </CCardBody>
      </CCard>
      <CCard className="w-50">
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CButton color="primary" href="#">Go somewhere</CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

Using custom CSS#
Use custom CSS in your stylesheets or as inline styles to set a width.

Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'

export const CardSizing3Example = () => {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CCardText>
          With supporting text below as a natural lead-in to additional content.
        </CCardText>
        <CButton color="primary" href="#">Go somewhere</CButton>
      </CCardBody>
    </CCard>
  )
}

Text alignment#
You can instantly change the text arrangement of any card—in its whole or specific parts—with text align classes.

Special title treatment
With supporting text below as a natural lead-in to additional content.

Special title treatment
With supporting text below as a natural lead-in to additional content.

Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'

export const CardTextAlignmentExample = () => {
  return (
    <>
      <CCard className="mb-3" style={{ width: '18rem' }}>
        <CCardBody>
          <CCardTitle>Special title treatment</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CButton color="primary" href="#">
            Go somewhere
          </CButton>
        </CCardBody>
      </CCard>
      <CCard className="mb-3 text-center" style={{ width: '18rem' }}>
        <CCardBody>
          <CCardTitle>Special title treatment</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CButton color="primary" href="#">
            Go somewhere
          </CButton>
        </CCardBody>
      </CCard>
      <CCard className="text-end" style={{ width: '18rem' }}>
        <CCardBody>
          <CCardTitle>Special title treatment</CCardTitle>
          <CCardText>
            With supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CButton color="primary" href="#">
            Go somewhere
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

Navigation#
Add some navigation to a <CCardHeader> with our <CNav> component.

Active
Link
Disabled
Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'

export const CardNavigationExample = () => {
  return (
    <CCard className="text-center">
      <CCardHeader>
        <CNav variant="tabs" className="card-header-tabs">
          <CNavItem>
            <CNavLink href="#" active>Active</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Link</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" disabled>Disabled</CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText>
        <CButton color="primary" href="#">Go somewhere</CButton>
      </CCardBody>
    </CCard>
  )
}

Active
Link
Disabled
Special title treatment
With supporting text below as a natural lead-in to additional content.

JavaScript
TypeScript
import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'

export const CardNavigation2Example = () => {
  return (
    <CCard className="text-center">
      <CCardHeader>
        <CNav variant="pills" className="card-header-pills">
          <CNavItem>
            <CNavLink href="#" active>Active</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Link</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" disabled>Disabled</CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText>
        <CButton color="primary" href="#">Go somewhere</CButton>
      </CCardBody>
    </CCard>
  )
}

Images#
Cards introduce several options for acting with images. Pick from appending "image caps" at either end of a card, overlaying images with content, or just inserting the image in a card.

Image caps#
Similar to headers and footers, cards can include top and bottom "image caps"—images at the top or bottom of a card.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago


JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

export const CardImageCapsExample = () => {
  return (
    <>
      <CCard className="mb-3">
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.
          </CCardText>
          <CCardText>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard className="mb-3">
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.
          </CCardText>
          <CCardText>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
        <CCardImage orientation="bottom" src={'/images/react.jpg'} />
      </CCard>
    </>
  )
}

Image overlays#
Adapt an image into a background and overlay your text. Depending on the image, you may need additional styles or utilities.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardImage, CCardImageOverlay, CCardText, CCardTitle } from '@coreui/react'

export const CardImageOverlaysExample = () => {
  return (
    <CCard className="mb-3 bg-dark text-white">
      <CCardImage src={'/images/react.jpg'} />
      <CCardImageOverlay className="d-flex flex-column align-items-center justify-content-center">
        <CCardTitle>Card title</CCardTitle>
        <CCardText>
          This is a wider card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer.
        </CCardText>
        <CCardText>Last updated 3 mins ago</CCardText>
      </CCardImageOverlay>
    </CCard>
  )
}

Horizontal#
Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with .g-0 and use .col-md-* classes to make the card horizontal at the md breakpoint. Further adjustments may be needed depending on your card content.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const CardImageHorizontalExample = () => {
  return (
    <CCard className="mb-3" style={{ maxWidth: '540px' }}>
      <CRow className="g-0">
        <CCol md={4}>
          <CCardImage src={'/images/react400.jpg'} />
        </CCol>
        <CCol md={8}>
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
            <CCardText>
              <small className="text-body-secondary">Last updated 3 mins ago</small>
            </CCardText>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  )
}

Card styles#
Cards include various options for customizing their backgrounds, borders, and color.

Background and color#
Use color property to change the appearance of a card.

Header
primary card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
secondary card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
success card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
danger card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
warning card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
info card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
light card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
dark card title
Some quick example text to build on the card title and make up the bulk of the card's content.

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const CardStylesBackgroundAndColorExample = () => {
  const colors = [
    { color: 'primary' },
    { color: 'secondary' },
    { color: 'success' },
    { color: 'danger' },
    { color: 'warning' },
    { color: 'info' },
    { color: 'light' },
    { color: 'dark' },
  ]

  return (
    <CRow>
      {colors.map((item, index) => (
        <CCol sm={6} key={index}>
          <CCard textBgColor={item.color} className="mb-3">
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle>{item.color} card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

Conveying meaning to assistive technologies
Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with the .visually-hidden class.

Border#
Use border utilities to change just the border-color of a card. Note that you can set textColor property on the <CCard> or a subset of the card's contents as shown below.

Header
primary card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
secondary card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
success card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
danger card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
warning card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
info card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
dark card title
Some quick example text to build on the card title and make up the bulk of the card's content.

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const CardStylesBorderExample = () => {
  const colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'dark', textColor: 'dark' },
  ]

  return (
    <CRow>
      {colors.map((item, index) => (
        <CCol sm={6} key={index}>
          <CCard textColor={item.textColor} className={"mb-3 border-${"item.color}"}>
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle>{item.color} card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

Top border#
Header
primary card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
secondary card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
success card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
danger card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
warning card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
info card title
Some quick example text to build on the card title and make up the bulk of the card's content.

Header
dark card title
Some quick example text to build on the card title and make up the bulk of the card's content.

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const CardStylesTopBorderExample = () => {
  const colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'dark', textColor: 'dark' },
  ]

  return (
    <CRow>
      {colors.map((item, index) => (
        <CCol sm={6} key={index}>
          <CCard
            textColor={item.textColor}
            className={"mb-3 border-top-${"item.color} border-top-3"}
          >
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle>{item.color} card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

Card layout#
In addition to styling the content within cards, CoreUI includes a few options for laying out series of cards. For the time being, these layout options are not yet responsive.

Card groups#
Use card groups to render cards as a single, attached element with equal width and height columns. Card groups start off stacked and use display: flex; to become attached with uniform dimensions starting at the sm breakpoint.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago


Card title
This card has supporting text below as a natural lead-in to additional content.

Last updated 3 mins ago


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.

Last updated 3 mins ago

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardGroup, CCardImage, CCardText, CCardTitle } from '@coreui/react'

export const CardGroupsExample = () => {
  return (
    <CCardGroup>
      <CCard>
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.
          </CCardText>
          <CCardText>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This card has supporting text below as a natural lead-in to additional content.
          </CCardText>
          <CCardText>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional
            content. This card has even longer content than the first to show that equal height
            action.
          </CCardText>
          <CCardText>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCardGroup>
  )
}

When using card groups with footers, their content will automatically line up.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This card has supporting text below as a natural lead-in to additional content.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.

Last updated 3 mins ago
JavaScript
TypeScript
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardImage,
  CCardText,
  CCardTitle,
} from '@coreui/react'

export const CardGroups2Example = () => {
  return (
    <CCardGroup>
      <CCard>
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.
          </CCardText>
        </CCardBody>
        <CCardFooter>
          <small className="text-body-secondary">Last updated 3 mins ago</small>
        </CCardFooter>
      </CCard>
      <CCard>
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This card has supporting text below as a natural lead-in to additional content.
          </CCardText>
        </CCardBody>
        <CCardFooter>
          <small className="text-body-secondary">Last updated 3 mins ago</small>
        </CCardFooter>
      </CCard>
      <CCard>
        <CCardImage orientation="top" src={'/images/react.jpg'} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            This is a wider card with supporting text below as a natural lead-in to additional
            content. This card has even longer content than the first to show that equal height
            action.
          </CCardText>
        </CCardBody>
        <CCardFooter>
          <small className="text-body-secondary">Last updated 3 mins ago</small>
        </CCardFooter>
      </CCard>
    </CCardGroup>
  )
}

Grid cards#
Use the CRow component and set xs|sm|md|lg|xl|xxl}={{ cols: * }} property to control how many grid columns (wrapped around your cards) you show per row. For example, here's xs={{cols: 1}} laying out the cards on one column, and md={{cols: 1}} splitting four cards to equal width across multiple rows, from the medium breakpoint up.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago
JavaScript
TypeScript
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'

export const CardGridExample = () => {
  return (
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

Change it to md={{ cols: 3}} and you'll see the fourth card wrap.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago
JavaScript
TypeScript
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'

export const CardGrid2Example = () => {
  return (
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard>
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

When you need equal height, add .h-100 to the cards. If you want equal heights by default, you can set $card-height: 100% in Sass.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.


Card title
This card has supporting text below as a natural lead-in to additional content.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

JavaScript
TypeScript
import React from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const CardGrid3Example = () => {
  return (
    <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This card has supporting text below as a natural lead-in to additional content.
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This card has even longer content than the first to show that equal height
              action.
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Just like with card groups, card footers will automatically line up.


Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.

Last updated 3 mins ago

Card title
This card has supporting text below as a natural lead-in to additional content.

Last updated 3 mins ago

Card title
This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.

Last updated 3 mins ago
JavaScript
TypeScript
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'

export const CardGrid4Example = () => {
  return (
    <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This card has supporting text below as a natural lead-in to additional content.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardImage orientation="top" src={'/images/react.jpg'} />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This card has even longer content than the first to show that equal height
              action.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

API#
Check out the documentation below for a comprehensive guide to all the props you can use with the components mentioned here.

<CCard />
<CCardBody />
<CCardFooter />
<CCardGroup />
<CCardHeader />
<CCardImage />
<CCardImageOverlay />
<CCardLink />
<CCardSubtitle />
<CCardText />
<CCardTitle />`,
});
