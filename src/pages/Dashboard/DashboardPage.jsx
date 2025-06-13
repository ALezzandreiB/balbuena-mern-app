import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Container
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts matching the example
const chartData = [
  { quarter: 'Q1', series1: 35, series2: 45 },
  { quarter: 'Q2', series1: 42, series2: 10 },
  { quarter: 'Q3', series1: 28, series2: 42 },
  { quarter: 'Q4', series1: 38, series2: 30 }
];

const pieData = [
  { name: 'Group A', value: 30, fill: '#0088FE' },
  { name: 'Group B', value: 45, fill: '#00C49F' },
  { name: 'Group C', value: 25, fill: '#FFBB28' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Sample user data matching the example
const users = [
  { id: 1, firstName: 'Jim', lastName: 'Chen', age: 19, fullName: 'Jim Chen' },
  { id: 2, firstName: 'Carlos', lastName: 'Larionev', age: 31, fullName: 'Carlos Larionev' },
  { id: 3, firstName: 'Jamie', lastName: 'Larionov', age: 25, fullName: 'Jamie Larionov' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11, fullName: 'Arya Stark' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: 32, fullName: 'Daenerys Targaryen' }
];

// Enhanced color palette
const colors = {
  primary: '#9503b9',
  primaryLight: '#b04dc9',
  primaryDark: '#6a0dad',
  background: '#f4f5b7',
  paper: '#ffffff',
  text: '#2d3748',
  border: '#e2e8f0',
  chartFill: '#e9d5f5',
};

// Enhanced styled components
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
  textAlign: 'center',
  marginBottom: 40,
  padding: '20px 0'
});

const StyledPaper = styled(Paper)({
  padding: 24,
  background: colors.paper,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  border: `1px solid ${colors.border}`,
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
  }
});

const MetricCard = styled(Paper)({
  padding: 32,
  background: `linear-gradient(135deg, ${colors.paper} 0%, #fafafa 100%)`,
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  border: `2px solid ${colors.border}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 48px rgba(149, 3, 185, 0.15)',
    borderColor: colors.primary
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
  }
});

const MetricValue = styled(Typography)({
  fontSize: '3.5rem',
  fontWeight: 700,
  marginTop: 16,
  marginBottom: 8,
  color: colors.primary,
  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

const MetricLabel = styled(Typography)({
  color: colors.text,
  fontSize: '1rem',
  fontWeight: 600,
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '1px'
});

const SectionTitle = styled(Typography)({
  marginBottom: 24,
  fontWeight: 700,
  textAlign: 'center',
  color: colors.text,
  fontSize: '1.5rem'
});

const ChartContainer = styled(Box)({
  height: 350,
  width: '100%',
  marginTop: 16
});

const TableStyled = styled(Table)({
  '& .MuiTableHead-root': {
    backgroundColor: colors.primary,
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 700,
      fontSize: '0.95rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      padding: '20px 16px'
    }
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      '&:nth-of-type(even)': {
        backgroundColor: '#f8f9fa'
      },
      '&:hover': {
        backgroundColor: colors.chartFill,
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease'
      }
    },
    '& .MuiTableCell-root': {
      padding: '16px',
      fontSize: '0.95rem',
      fontWeight: 500
    }
  }
});

const DashboardPage = () => {
  // Set values to match example
  const totalUsers = 5;
  const averageAge = 23.6;

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              color: colors.text,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: 2
            }}
          >
            Dashboard
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: colors.text,
              opacity: 0.7,
              fontWeight: 400
            }}
          >
            Welcome to your analytics overview
          </Typography>
        </PageHeader>
        
        {/* Enhanced Summary Cards */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <MetricCard elevation={0}>
              <MetricLabel>Total Users</MetricLabel>
              <MetricValue>{totalUsers}</MetricValue>
            </MetricCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <MetricCard elevation={0}>
              <MetricLabel>Average Age</MetricLabel>
              <MetricValue>{averageAge}</MetricValue>
            </MetricCard>
          </Grid>
        </Grid>
        
        {/* Enhanced Charts Section */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} lg={8}>
            <StyledPaper elevation={0}>
              <SectionTitle>
                Quarterly Performance
              </SectionTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis 
                      dataKey="quarter" 
                      tick={{ fill: colors.text }}
                      axisLine={{ stroke: colors.border }}
                    />
                    <YAxis 
                      tick={{ fill: colors.text }}
                      axisLine={{ stroke: colors.border }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: colors.paper,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="series1" 
                      name="Series 1" 
                      fill={colors.primary}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="series2" 
                      name="Series 2" 
                      fill={colors.primaryLight}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledPaper elevation={0}>
              <SectionTitle>
                Distribution
              </SectionTitle>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: colors.paper,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </StyledPaper>
          </Grid>
        </Grid>
        
        {/* Enhanced Users Overview Section */}
        <StyledPaper elevation={0}>
          <SectionTitle>
            Users Overview
          </SectionTitle>
          <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <TableStyled>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Full name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ fontWeight: 700, color: colors.primary }}>
                      {user.id}
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>
                      <Typography 
                        component="span" 
                        sx={{ 
                          backgroundColor: colors.chartFill,
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}
                      >
                        {user.age}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{user.fullName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableStyled>
          </TableContainer>
        </StyledPaper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DashboardPage;