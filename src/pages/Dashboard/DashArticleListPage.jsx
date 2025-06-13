import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  styled,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  Avatar,
  Switch,
  FormControlLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ArticleService from '../../services/ArticleService';
import { useAuth } from '../../context/useAuth';

// Color palette - matching your current theme
const colors = {
  primary: '#9503b9',
  primaryLight: '#b04dc9',
  primaryDark: '#6a0dad',
  background: '#f8f9fc',
  paper: '#ffffff',
  text: '#2d3748',
  border: '#e2e8f0',
  success: '#48bb78',
  error: '#f56565',
  warning: '#ed8936',
  info: '#4299e1'
};

// Enhanced styled components
const PageContainer = styled(Box)({
  padding: '32px',
  backgroundColor: colors.background,
  minHeight: '100vh'
});

const ContentWrapper = styled(Box)({
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto'
});

const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 32
});

const StyledPaper = styled(Paper)({
  padding: 0,
  background: colors.paper,
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  overflow: 'hidden'
});

const TableHeader = styled(TableHead)({
  backgroundColor: alpha(colors.primary, 0.08),
  '& .MuiTableCell-head': {
    color: colors.text,
    fontWeight: 700,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    backgroundColor: alpha(colors.primary, 0.02),
  },
  '&:hover': {
    backgroundColor: alpha(colors.primary, 0.06),
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease'
  }
});

const StyledTableCell = styled(TableCell)({
  padding: '20px 16px',
  borderBottom: `1px solid ${colors.border}`
});

const AddButton = styled(Button)({
  backgroundColor: colors.primary,
  '&:hover': {
    backgroundColor: colors.primaryDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(149, 3, 185, 0.3)'
  },
  minWidth: '140px',
  padding: '12px 24px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(149, 3, 185, 0.3)',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  transition: 'all 0.3s ease'
});

const ActionButton = styled(IconButton)({
  padding: 10,
  marginRight: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: colors.paper,
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: alpha(colors.primary, 0.1),
    borderColor: colors.primary,
    transform: 'translateY(-1px)'
  },
  transition: 'all 0.2s ease'
});

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: 
    status === 'Published' ? alpha(colors.success, 0.15) :
    status === 'Draft' ? alpha(colors.warning, 0.15) :
    alpha(colors.error, 0.15),
  color: 
    status === 'Published' ? colors.success :
    status === 'Draft' ? colors.warning :
    colors.error,
  fontWeight: 600,
  borderRadius: 20,
  padding: '8px 4px',
  fontSize: '0.8rem'
}));

const CategoryChip = styled(Chip)({
  backgroundColor: alpha(colors.info, 0.15),
  color: colors.info,
  fontWeight: 500,
  borderRadius: 16,
  fontSize: '0.75rem'
});

const AuthorAvatar = styled(Avatar)({
  backgroundColor: colors.primary,
  width: 32,
  height: 32,
  fontSize: '0.8rem',
  fontWeight: 600
});

const FormField = styled(TextField)({
  marginBottom: 20,
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '&:hover fieldset': {
      borderColor: colors.primaryLight,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.primary,
      borderWidth: 2
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: colors.primary,
    fontWeight: 600
  }
});

const SaveButton = styled(Button)({
  background: `linear-gradient(135deg, ${colors.success} 0%, #38a169 100%)`,
  '&:hover': {
    background: `linear-gradient(135deg, #38a169 0%, #2f855a 100%)`,
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(72, 187, 120, 0.4)'
  },
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 10,
  padding: '12px 32px',
  transition: 'all 0.3s ease'
});

const CancelButton = styled(Button)({
  color: colors.text,
  borderColor: colors.border,
  '&:hover': {
    backgroundColor: alpha(colors.error, 0.1),
    borderColor: colors.error,
    color: colors.error
  },
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 10,
  padding: '12px 32px',
  transition: 'all 0.3s ease'
});

// Sample articles data (replace with real API calls later)
const initialArticles = [
  {
    id: 1,
    title: 'Getting Started with MERN Stack',
    content: 'Learn how to build modern web applications using MongoDB, Express, React, and Node.js...',
    author: { firstName: 'John', lastName: 'Doe', role: 'Editor' },
    category: 'Technology',
    status: 'Published',
    featured: true,
    views: 245,
    likes: 32,
    createdAt: '2024-11-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'React Best Practices 2024',
    content: 'Explore the latest React patterns and best practices for modern web development...',
    author: { firstName: 'Jane', lastName: 'Smith', role: 'Admin' },
    category: 'Technology',
    status: 'Draft',
    featured: false,
    views: 0,
    likes: 0,
    createdAt: '2024-11-14T15:20:00Z'
  },
  {
    id: 3,
    title: 'Database Design Fundamentals',
    content: 'Understanding the principles of good database design for scalable applications...',
    author: { firstName: 'Mike', lastName: 'Johnson', role: 'Editor' },
    category: 'Education',
    status: 'Published',
    featured: false,
    views: 189,
    likes: 24,
    createdAt: '2024-11-13T09:15:00Z'
  }
];

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [open, setOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    title: '',
    content: '',
    category: 'Technology',
    tags: '',
    status: 'Draft',
    featured: false
  });
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { user } = useAuth();

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClickOpen = () => {
    setCurrentArticle({
      title: '',
      content: '',
      category: 'Technology',
      tags: '',
      status: 'Draft',
      featured: false
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditArticle = (article) => {
    setCurrentArticle({
      ...article,
      tags: article.tags ? article.tags.join(', ') : ''
    });
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
      showSnackbar('Article deleted successfully');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentArticle({
      ...currentArticle,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    const articleData = {
      ...currentArticle,
      author: { firstName: user?.firstName, lastName: user?.lastName, role: user?.role },
      views: editing ? currentArticle.views : 0,
      likes: editing ? currentArticle.likes : 0,
      createdAt: editing ? currentArticle.createdAt : new Date().toISOString()
    };

    if (editing) {
      setArticles(articles.map(article => 
        article.id === currentArticle.id ? { ...articleData, id: currentArticle.id } : article
      ));
      showSnackbar('Article updated successfully');
    } else {
      const newId = Math.max(...articles.map(article => article.id)) + 1;
      setArticles([{ ...articleData, id: newId }, ...articles]);
      showSnackbar('Article created successfully');
    }
    setOpen(false);
  };

  const getAuthorInitials = (author) => {
    if (!author) return 'U';
    return `${author.firstName?.charAt(0) || ''}${author.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const categories = ['Technology', 'Health', 'Education', 'Sports', 'Entertainment', 'News', 'Opinion', 'Other'];

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <Typography variant="h4" sx={{ fontWeight: 700, color: colors.text }}>
            Articles Management
            <Typography variant="body2" sx={{ color: colors.text, opacity: 0.7, mt: 1 }}>
              Create and manage articles for the platform
            </Typography>
          </Typography>
          <AddButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            disableElevation
          >
            Create Article
          </AddButton>
        </PageHeader>

        <StyledPaper>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <StyledTableCell>Article</StyledTableCell>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Stats</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <StyledTableRow key={article.id}>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 2 }}>
                          <ArticleIcon sx={{ color: colors.primary, fontSize: 32 }} />
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {truncateText(article.title, 40)}
                            {article.featured && (
                              <StarIcon sx={{ color: colors.warning, fontSize: 16, ml: 1 }} />
                            )}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {truncateText(article.content, 60)}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AuthorAvatar>
                          {getAuthorInitials(article.author)}
                        </AuthorAvatar>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {article.author?.firstName} {article.author?.lastName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {article.author?.role}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <CategoryChip label={article.category} size="small" />
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusChip 
                        label={article.status} 
                        size="small" 
                        status={article.status}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <VisibilityIcon sx={{ fontSize: 14, color: colors.info }} />
                          <Typography variant="caption">{article.views || 0}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FavoriteIcon sx={{ fontSize: 14, color: colors.error }} />
                          <Typography variant="caption">{article.likes || 0}</Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2">
                        {formatDate(article.createdAt)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionButton onClick={() => handleEditArticle(article)} size="small">
                        <EditIcon fontSize="small" />
                      </ActionButton>
                      <ActionButton 
                        onClick={() => handleDeleteArticle(article.id)} 
                        size="small"
                        sx={{ '&:hover': { backgroundColor: alpha(colors.error, 0.1) } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </ActionButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ 
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: 'white',
            fontWeight: 700,
            fontSize: '1.3rem',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <ArticleIcon />
            {editing ? 'Edit Article' : 'Create New Article'}
          </DialogTitle>
          <DialogContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormField
                  autoFocus
                  name="title"
                  label="Article Title"
                  fullWidth
                  variant="outlined"
                  value={currentArticle.title}
                  onChange={handleChange}
                  placeholder="Enter a compelling title for your article"
                />
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={currentArticle.category}
                    onChange={handleChange}
                    label="Category"
                    sx={{ borderRadius: 2 }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={currentArticle.status}
                    onChange={handleChange}
                    label="Status"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name="content"
                  label="Article Content"
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={currentArticle.content}
                  onChange={handleChange}
                  placeholder="Write your article content here..."
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentArticle.featured}
                      onChange={handleChange}
                      name="featured"
                      color="primary"
                    />
                  }
                  label="Featured Article"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 4, pt: 0 }}>
            <CancelButton onClick={handleClose} variant="outlined">
              Cancel
            </CancelButton>
            <SaveButton onClick={handleSave} variant="contained">
              {editing ? 'Update Article' : 'Create Article'}
            </SaveButton>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DashArticleListPage;