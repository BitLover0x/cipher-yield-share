# Vercel Deployment Guide for Cipher Yield Share

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account
- Vercel account
- Node.js 18+ installed locally

### Step 1: Prepare the Repository

1. **Fork or Clone the Repository**
   ```bash
   git clone https://github.com/BitLover0x/cipher-yield-share-v2.git
   cd cipher-yield-share-v2
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Test Local Build**
   ```bash
   npm run build
   ```

### Step 2: Create Vercel Account and Connect GitHub

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Authorize Vercel to access your GitHub repositories

### Step 3: Deploy to Vercel

1. **Import Project**
   - In Vercel dashboard, click "New Project"
   - Select "Import Git Repository"
   - Choose `cipher-yield-share-v2` from your GitHub repositories
   - Click "Import"

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 4: Set Environment Variables

1. **Go to Project Settings**
   - In your Vercel project dashboard
   - Click on "Settings" tab
   - Navigate to "Environment Variables"

2. **Add the following variables**:

   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
   NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
   NEXT_PUBLIC_VERIFIER_ADDRESS=YOUR_VERIFIER_ADDRESS
   ```

3. **Set Environment for All Environments**
   - Production
   - Preview
   - Development

### Step 5: Deploy

1. **Deploy Now**
   - Click "Deploy" button
   - Wait for the build process to complete
   - Note the deployment URL (e.g., `https://cipher-yield-share-v2.vercel.app`)

### Step 6: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to "Domains" tab in project settings
   - Add your custom domain
   - Configure DNS records as instructed by Vercel

### Step 7: Verify Deployment

1. **Test the Application**
   - Visit the deployed URL
   - Test wallet connection
   - Verify all features work correctly

2. **Check Build Logs**
   - If deployment fails, check the build logs
   - Common issues:
     - Missing environment variables
     - Build command errors
     - Dependency conflicts

### Step 8: Set Up Automatic Deployments

1. **Enable Auto-Deploy**
   - In project settings, ensure "Git Integration" is enabled
   - Every push to main branch will trigger automatic deployment
   - Preview deployments for pull requests

### Troubleshooting

#### Common Issues:

1. **Build Fails with "Module not found"**
   - Ensure all dependencies are in `package.json`
   - Run `npm install` locally to verify

2. **Environment Variables Not Working**
   - Check variable names (case-sensitive)
   - Ensure variables are set for all environments
   - Redeploy after adding variables

3. **Wallet Connection Issues**
   - Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correct
   - Check RPC URL is accessible

4. **Contract Interaction Fails**
   - Verify contract address is correct
   - Ensure contract is deployed on Sepolia testnet

#### Performance Optimization:

1. **Enable Vercel Analytics**
   - Go to Analytics tab
   - Enable Web Analytics

2. **Configure Caching**
   - Add `vercel.json` for custom caching rules
   - Optimize static assets

### Final Configuration

1. **Update README**
   - Add deployment URL to README
   - Update documentation with live link

2. **Set Up Monitoring**
   - Configure error tracking
   - Set up uptime monitoring

3. **Security**
   - Review environment variables
   - Ensure no sensitive data in public variables

## Deployment Checklist

- [ ] Repository cloned and dependencies installed
- [ ] Local build successful
- [ ] Vercel account created and connected to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] Initial deployment successful
- [ ] Application tested on live URL
- [ ] Custom domain configured (if needed)
- [ ] Auto-deployments enabled
- [ ] Documentation updated

## Support

If you encounter issues during deployment:

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test locally with `npm run build`
4. Verify all environment variables are set correctly

## Live Application

Once deployed, your application will be available at:
`https://cipher-yield-share-v2.vercel.app`

Replace with your actual Vercel URL after deployment.
