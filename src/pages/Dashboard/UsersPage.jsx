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
  Avatar,
  styled,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import SecurityIcon from '@mui/icons-material/Security';

// Enhanced color palette
const colors = {
  primary: '#9503b9',
  primaryLight: '#b04dc9',
  primaryDark: '#6a0dad',
  background: '#f4f5b7',
  paper: '#ffffff',
  text: '#2d3748',
  border: '#e2e8f0',
  success: '#48bb78',
  error: '#f56565',
  warning: '#ed8936',
  info: '#4299e1',
  chartFill: '#e9d5f5'
};

// Enhanced styled components with full-width layout
const PageContainer = styled(Box)({
  backgroundColor: colors.background,
  minHeight: '100vh',
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box'
});

const ContentWrapper = styled(Box)({
  width: '100%',
  maxWidth: '100%',
  padding: 0,
  margin: 0
});

const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 40,
  padding: '20px 0',
  flexWrap: 'wrap',
  gap: '20px'
});

const HeaderContent = styled(Box)({
  flex: 1,
  minWidth: '300px'
});

const StyledPaper = styled(Paper)({
  padding: 0,
  background: colors.paper,
  borderRadius: 20,
  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  border: `1px solid ${colors.border}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
  }
});

const TableHeader = styled(TableHead)({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  '& .MuiTableCell-head': {
    color: 'white',
    fontWeight: 700,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '24px 20px',
    border: 'none'
  }
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    backgroundColor: alpha(colors.primary, 0.02),
  },
  '&:hover': {
    backgroundColor: alpha(colors.primary, 0.08),
    transform: 'translateX(4px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(149, 3, 185, 0.1)'
  }
});

const StyledTableCell = styled(TableCell)({
  padding: '24px 20px',
  borderBottom: `1px solid ${colors.border}`,
  fontSize: '0.95rem'
});

const AddButton = styled(Button)({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  '&:hover': {
    background: `linear-gradient(135deg, ${colors.primaryDark} 0%, #5a0a8a 100%)`,
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(149, 3, 185, 0.4)'
  },
  minWidth: '160px',
  padding: '14px 28px',
  borderRadius: '16px',
  boxShadow: '0 6px 20px rgba(149, 3, 185, 0.3)',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  transition: 'all 0.3s ease'
});

const ActionButton = styled(IconButton)({
  padding: 12,
  marginRight: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  backgroundColor: colors.paper,
  border: '2px solid transparent',
  borderRadius: '12px',
  '&:hover': {
    backgroundColor: alpha(colors.primary, 0.1),
    borderColor: colors.primary,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(149, 3, 185, 0.2)'
  },
  transition: 'all 0.3s ease'
});

// Enhanced Dialog Styles
const EnhancedDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    minWidth: 600,
    maxWidth: 700,
    boxShadow: '0 25px 80px rgba(0,0,0,0.15)'
  }
});

const StyledDialogTitle = styled(DialogTitle)({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  color: 'white',
  fontWeight: 700,
  fontSize: '1.5rem',
  padding: '32px 40px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});

const EnhancedDialogContent = styled(DialogContent)({
  padding: '40px',
  backgroundColor: alpha(colors.background, 0.3)
});

const FormSection = styled(Box)({
  marginBottom: '32px',
  padding: '24px',
  backgroundColor: colors.paper,
  borderRadius: '16px',
  border: `2px solid ${colors.border}`,
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: alpha(colors.primary, 0.3)
  }
});

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  color: colors.text,
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '1.1rem'
});

const StyledChip = styled(Chip)(({ role }) => ({
  backgroundColor: 
    role === 'Admin' ? alpha(colors.primary, 0.15) :
    role === 'Editor' ? alpha(colors.success, 0.15) :
    alpha(colors.info, 0.15),
  color: 
    role === 'Admin' ? colors.primary :
    role === 'Editor' ? colors.success :
    colors.info,
  fontWeight: 700,
  borderRadius: 25,
  padding: '12px 8px',
  fontSize: '0.85rem',
  height: '36px',
  border: `2px solid ${
    role === 'Admin' ? alpha(colors.primary, 0.3) :
    role === 'Editor' ? alpha(colors.success, 0.3) :
    alpha(colors.info, 0.3)
  }`
}));

const UserAvatar = styled(Avatar)({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  width: 48,
  height: 48,
  fontSize: '1.1rem',
  fontWeight: 700,
  boxShadow: '0 4px 16px rgba(149, 3, 185, 0.3)',
  border: `3px solid ${colors.paper}`
});

const FormField = styled(TextField)({
  marginBottom: 24,
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: alpha(colors.paper, 0.8),
    '&:hover fieldset': {
      borderColor: colors.primaryLight,
      borderWidth: '2px'
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.primary,
      borderWidth: '3px'
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: colors.primary,
    fontWeight: 700
  }
});

const SaveButton = styled(Button)({
  background: `linear-gradient(135deg, ${colors.success} 0%, #38a169 100%)`,
  '&:hover': {
    background: `linear-gradient(135deg, #38a169 0%, #2f855a 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(72, 187, 120, 0.4)'
  },
  textTransform: 'none',
  fontWeight: 700,
  borderRadius: 12,
  padding: '14px 40px',
  fontSize: '1rem',
  transition: 'all 0.3s ease'
});

const CancelButton = styled(Button)({
  color: colors.text,
  borderColor: colors.border,
  borderWidth: '2px',
  '&:hover': {
    backgroundColor: alpha(colors.error, 0.1),
    borderColor: colors.error,
    borderWidth: '2px',
    color: colors.error,
    transform: 'translateY(-1px)'
  },
  textTransform: 'none',
  fontWeight: 700,
  borderRadius: 12,
  padding: '14px 40px',
  fontSize: '1rem',
  transition: 'all 0.3s ease'
});

// Sample users data (replace with real API calls later)
const initialUsers = [
  { id: 1, firstName: 'Jim', lastName: 'Chen', email: 'jim.chen@example.com', age: 19, role: 'User' },
  { id: 2, firstName: 'Carlos', lastName: 'Larionev', email: 'carlos@example.com', age: 31, role: 'Admin' },
  { id: 3, firstName: 'Jamie', lastName: 'Larionov', email: 'jamie@example.com', age: 25, role: 'Editor' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', email: 'arya@example.com', age: 11, role: 'User' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', email: 'daenerys@example.com', age: 32, role: 'Admin' }
];

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ 
    id: null, 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '',
    age: '', 
    role: 'User' 
  });
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClickOpen = () => {
    setCurrentUser({ 
      id: null, 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '',
      age: '', 
      role: 'User' 
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditUser = (user) => {
    setCurrentUser({ ...user, password: '' }); // Don't show password
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      showSnackbar('User deleted successfully');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: name === 'age' ? (value === '' ? '' : parseInt(value, 10)) : value
    });
  };

  const handleSave = () => {
    if (editing) {
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
      showSnackbar('User updated successfully');
    } else {
      const newId = Math.max(...users.map(user => user.id)) + 1;
      setUsers([...users, { ...currentUser, id: newId }]);
      showSnackbar('User created successfully');
    }
    setOpen(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <PageContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} sx={{ color: colors.primary }} />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <HeaderContent>
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              color: colors.text,
              marginBottom: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Users Management
            </Typography>
            <Typography variant="h6" sx={{ 
              color: colors.text, 
              opacity: 0.7,
              fontWeight: 400,
              lineHeight: 1.6
            }}>
              Manage user accounts, roles and permissions across your platform
            </Typography>
          </HeaderContent>
          <AddButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            disableElevation
          >
            Add New User
          </AddButton>
        </PageHeader>

        <StyledPaper>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <StyledTableCell sx={{ color: 'white' }}>User Profile</StyledTableCell>
                  <StyledTableCell sx={{ color: 'white' }}>Contact Information</StyledTableCell>
                  <StyledTableCell sx={{ color: 'white' }}>Age</StyledTableCell>
                  <StyledTableCell sx={{ color: 'white' }}>Role & Permissions</StyledTableCell>
                  <StyledTableCell align="right" sx={{ color: 'white' }}>Actions</StyledTableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <UserAvatar>
                          {getInitials(user.firstName, user.lastName)}
                        </UserAvatar>
                        <Box sx={{ ml: 3 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 700, 
                            mb: 0.5,
                            color: colors.text
                          }}>
                            {`${user.firstName} ${user.lastName}`}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            color: 'text.secondary',
                            fontWeight: 500
                          }}>
                            User ID: #{user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 600,
                        color: colors.primary
                      }}>
                        {user.email}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{
                        backgroundColor: colors.chartFill,
                        color: colors.primary,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}>
                        {user.age} years
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledChip 
                        label={user.role} 
                        size="medium" 
                        role={user.role}
                        icon={user.role === 'Admin' ? <SecurityIcon fontSize="small" /> : 
                              user.role === 'Editor' ? <EditIcon fontSize="small" /> :
                              <PersonIcon fontSize="small" />}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionButton onClick={() => handleEditUser(user)} size="medium">
                        <EditIcon fontSize="medium" />
                      </ActionButton>
                      <ActionButton 
                        onClick={() => handleDeleteUser(user.id)} 
                        size="medium"
                        sx={{ '&:hover': { 
                          backgroundColor: alpha(colors.error, 0.1),
                          borderColor: colors.error
                        }}}
                      >
                        <DeleteIcon fontSize="medium" />
                      </ActionButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>

        <EnhancedDialog open={open} onClose={handleClose} maxWidth="md">
          <StyledDialogTitle>
            <PersonIcon fontSize="large" />
            {editing ? 'Edit User Account' : 'Create New User Account'}
          </StyledDialogTitle>
          <EnhancedDialogContent>
            <FormSection>
              <SectionTitle variant="h6">
                <PersonIcon fontSize="medium" />
                Personal Information
              </SectionTitle>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormField
                    autoFocus
                    name="firstName"
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    value={currentUser.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    value={currentUser.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    name="age"
                    label="Age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={currentUser.age}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 1, max: 120 } }}
                    required
                  />
                </Grid>
              </Grid>
            </FormSection>

            <FormSection>
              <SectionTitle variant="h6">
                <EmailIcon fontSize="medium" />
                Account Details
              </SectionTitle>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormField
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={currentUser.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                {!editing && (
                  <Grid item xs={12}>
                    <FormField
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      value={currentUser.password}
                      onChange={handleChange}
                      helperText="Minimum 6 characters required"
                      required
                    />
                  </Grid>
                )}
              </Grid>
            </FormSection>

            <FormSection>
              <SectionTitle variant="h6">
                <SecurityIcon fontSize="medium" />
                Role & Permissions
              </SectionTitle>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ fontWeight: 600 }}>User Role</InputLabel>
                <Select
                  name="role"
                  value={currentUser.role}
                  onChange={handleChange}
                  label="User Role"
                  sx={{ 
                    borderRadius: 3,
                    backgroundColor: alpha(colors.paper, 0.8)
                  }}
                >
                  <MenuItem value="User">👤 User - Basic Access</MenuItem>
                  <MenuItem value="Editor">✏️ Editor - Content Management</MenuItem>
                  <MenuItem value="Admin">🔐 Admin - Full Access</MenuItem>
                </Select>
              </FormControl>
            </FormSection>
          </EnhancedDialogContent>
          <DialogActions sx={{ p: 5, pt: 0, gap: 2 }}>
            <CancelButton onClick={handleClose} variant="outlined">
              Cancel
            </CancelButton>
            <SaveButton onClick={handleSave} variant="contained">
              {editing ? 'Update User' : 'Create User'}
            </SaveButton>
          </DialogActions>
        </EnhancedDialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            severity={snackbar.severity} 
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{ borderRadius: 3, fontWeight: 600 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentWrapper>
    </PageContainer>
  );
};

export default UsersPage;