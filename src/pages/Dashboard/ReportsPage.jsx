import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  styled,
  Container,
  alpha
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 750 },
  { name: 'Aug', value: 950 },
  { name: 'Sep', value: 600 },
  { name: 'Oct', value: 520 },
  { name: 'Nov', value: 470 },
  { name: 'Dec', value: 590 }
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
  marginBottom: 32,
  background: colors.paper,
  borderRadius: 20,
  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  border: `1px solid ${colors.border}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
  }
});

const TabsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${colors.background}, transparent, ${colors.background})`
  }
});

const TabButton = styled(Box)(({ active }) => ({
  flex: 1,
  padding: '20px 32px',
  color: 'white',
  fontWeight: 700,
  fontSize: '1.1rem',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: active ? alpha('#ffffff', 0.2) : 'transparent',
  borderBottom: active ? `4px solid ${colors.background}` : 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  '&:hover': {
    backgroundColor: active ? alpha('#ffffff', 0.2) : alpha('#ffffff', 0.1),
    transform: 'translateY(-2px)'
  },
  '&::before': active ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '3px',
    background: colors.background,
    borderRadius: '0 0 6px 6px'
  } : {}
}));

const ChartContainer = styled(Box)({
  padding: '40px 32px',
  minHeight: 450
});

const ChartTitle = styled(Typography)({
  fontSize: '1.75rem',
  fontWeight: 700,
  marginBottom: 32,
  color: colors.text,
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
    borderRadius: '2px'
  }
});

const EmptyState = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '350px',
  color: alpha(colors.text, 0.6),
  textAlign: 'center',
  padding: '40px',
  background: `linear-gradient(135deg, ${alpha(colors.chartFill, 0.3)} 0%, ${alpha(colors.primary, 0.1)} 100%)`,
  borderRadius: '16px',
  margin: '0 32px 32px 32px'
});

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('trends');

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
            Reports
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: colors.text,
              opacity: 0.7,
              fontWeight: 400
            }}
          >
            Analytics and data insights
          </Typography>
        </PageHeader>
        
        <StyledPaper elevation={0}>
          <TabsContainer>
            <TabButton 
              active={activeTab === 'trends'} 
              onClick={() => setActiveTab('trends')}
            >
              Trends
            </TabButton>
            <TabButton 
              active={activeTab === 'category'} 
              onClick={() => setActiveTab('category')}
            >
              Category
            </TabButton>
          </TabsContainer>
          
          {activeTab === 'trends' && (
            <Box>
              <ChartContainer>
                <ChartTitle>
                  Monthly Revenue Trends
                </ChartTitle>
                <Box sx={{ height: 400, marginBottom: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={colors.border} 
                        vertical={false}
                        opacity={0.7}
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.text, fontSize: 14, fontWeight: 500 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.text, fontSize: 14, fontWeight: 500 }}
                        domain={[0, 1000]}
                        ticks={[0, 250, 500, 750, 1000]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: colors.paper, 
                          borderColor: colors.primary,
                          borderRadius: 12,
                          border: `2px solid ${colors.primary}`,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                          fontWeight: 600
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: 20,
                          fontSize: '14px',
                          fontWeight: 600
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Revenue ($)"
                        stroke={colors.primary} 
                        activeDot={{ 
                          r: 8, 
                          fill: colors.primary,
                          stroke: colors.paper,
                          strokeWidth: 3,
                          boxShadow: '0 4px 12px rgba(149, 3, 185, 0.4)'
                        }} 
                        strokeWidth={4}
                        dot={{ 
                          stroke: colors.primary, 
                          strokeWidth: 3, 
                          fill: colors.paper, 
                          r: 6
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </ChartContainer>
              
              <ChartContainer>
                <ChartTitle>
                  Monthly Data Distribution
                </ChartTitle>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={colors.border} 
                        vertical={false}
                        opacity={0.7}
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.text, fontSize: 14, fontWeight: 500 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.text, fontSize: 14, fontWeight: 500 }}
                        domain={[0, 1000]}
                        ticks={[0, 250, 500, 750, 1000]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: colors.paper, 
                          borderColor: colors.primary,
                          borderRadius: 12,
                          border: `2px solid ${colors.primary}`,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                          fontWeight: 600
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: 20,
                          fontSize: '14px',
                          fontWeight: 600
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="Distribution"
                        stroke={colors.primary} 
                        fill={colors.chartFill}
                        fillOpacity={0.6}
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </ChartContainer>
            </Box>
          )}
          
          {activeTab === 'category' && (
            <EmptyState>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                marginBottom: 2,
                color: colors.text
              }}>
                Category Analysis
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.6,
                maxWidth: '400px'
              }}>
                Select a category to view detailed analysis and insights. 
                This section will display comprehensive data breakdowns.
              </Typography>
            </EmptyState>
          )}
        </StyledPaper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ReportsPage;