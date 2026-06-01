# MamaSkills System Flow

## Complete System Flowchart

```mermaid
flowchart TD
    Start([App Launch]) --> Splash[Splash Screen<br/>MamaSkills Logo<br/>Tagline]
    
    Splash --> Language[Language Selection<br/>English/Luganda/Runyankore/Acholi]
    
    Language --> UserType{User Type Selection}
    
    UserType -->|Mother/Caregiver| MotherProfile[Mother Profile Setup<br/>Name, District, Children, Phone]
    UserType -->|Buyer/Business| BuyerDashboard[Buyer Dashboard]
    
    MotherProfile --> Trust[Trust Banner<br/>UCU Support<br/>LC1 Endorsed<br/>Data Privacy]
    
    Trust --> MotherDashboard[Mother Dashboard]
    
    %% Mother Dashboard Features
    MotherDashboard --> MotherNav{Mother Navigation}
    
    MotherNav -->|Home| MotherHome[Dashboard Home<br/>Progress Stats<br/>Quick Actions]
    MotherNav -->|Learn| SkillsLibrary[Skills Library<br/>Browse Courses<br/>Enroll in Skills]
    MotherNav -->|Market| MyShop[My Shop<br/>List Products<br/>Track Sales]
    MotherNav -->|Baby| BabyHealth[Baby Health Corner<br/>Danger Signs<br/>ANC Tracker<br/>Nutrition Guide]
    MotherNav -->|Profile| MotherProfile2[Mother Profile<br/>Settings<br/>Progress Stats]
    
    %% Skills Flow
    SkillsLibrary --> EnrollSkill[Enroll in Skill]
    EnrollSkill --> LessonView[View Lessons<br/>Watch Videos<br/>Complete Steps]
    LessonView --> SkillProgress[Track Progress<br/>Mark Complete]
    SkillProgress --> Certificate[Skill Completed]
    
    %% Selling Flow
    MyShop --> AddProduct[Add Product<br/>Photo, Price, Description]
    AddProduct --> ProductListed[Product Listed<br/>Visible to Buyers]
    ProductListed --> ReceiveOrder[Receive Order<br/>from Buyer]
    ReceiveOrder --> IncomeTracker[Income Tracker<br/>Earnings Updated]
    
    %% Buyer Dashboard Features
    BuyerDashboard --> BuyerNav{Buyer Navigation}
    
    BuyerNav -->|Browse Categories| Categories[Browse by Category<br/>Baking, Tailoring, Soap, etc.]
    BuyerNav -->|Search| Search[Search Products<br/>or Sellers]
    BuyerNav -->|Featured| Featured[Featured Products<br/>Top Sellers]
    BuyerNav -->|Marketplace| Marketplace[Full Marketplace<br/>All Products]
    
    %% Buying Flow
    Categories --> ProductDetails[View Product Details<br/>Price, Seller, Rating]
    Search --> ProductDetails
    Featured --> ProductDetails
    Marketplace --> ProductDetails
    
    ProductDetails --> PlaceOrder[Place Order]
    PlaceOrder --> OrderConfirmed[Order Confirmed<br/>Seller Notified]
    OrderConfirmed --> SellerFulfill[Seller Fulfills Order]
    SellerFulfill --> BuyerReceives[Buyer Receives Product]
    BuyerReceives --> RateProduct[Rate & Review]
    
    %% Cross-user interaction
    RateProduct -.->|Updates Seller Rating| ProductListed
    
    %% Baby Health Flow
    BabyHealth --> BabyAge[Enter Baby Age]
    BabyAge --> HealthTips[Age-Appropriate Tips<br/>Nutrition Guide]
    BabyHealth --> DangerSigns[Danger Signs Alert<br/>Find Clinic]
    BabyHealth --> ANCTracker[ANC Visit Tracker<br/>Schedule Appointments]
    
    %% Community Impact
    IncomeTracker -.->|Contributes to| CommunityImpact[Community Impact Stats<br/>Total Mothers Helped<br/>Total Income Generated]
    BuyerDashboard -.->|Shows| CommunityImpact
    
    style Start fill:#003366,color:#fff
    style MotherDashboard fill:#1F5C2E,color:#fff
    style BuyerDashboard fill:#B48C00,color:#1A1A2E
    style Certificate fill:#D5F0D5,color:#1F5C2E
    style OrderConfirmed fill:#D5F0D5,color:#1F5C2E
    style CommunityImpact fill:#EEF4FB,color:#003366
```

## User Journey: Mother

```mermaid
flowchart LR
    A[New Mother User] --> B[Onboarding<br/>Language & Profile]
    B --> C[Learn Skills<br/>Baking, Tailoring, etc.]
    C --> D[Complete Lessons<br/>Watch Videos]
    D --> E[List Products<br/>in Marketplace]
    E --> F[Receive Orders<br/>from Buyers]
    F --> G[Earn Income<br/>Track Progress]
    G --> H[Access Baby<br/>Health Tips]
    
    style A fill:#003366,color:#fff
    style G fill:#B48C00,color:#1A1A2E
    style H fill:#1F5C2E,color:#fff
```

## User Journey: Buyer

```mermaid
flowchart LR
    A[New Buyer User] --> B[Select User Type<br/>Buyer/Business]
    B --> C[Browse Categories<br/>or Search]
    C --> D[View Products<br/>from Mothers]
    D --> E[Place Order]
    E --> F[Receive Product]
    F --> G[Rate & Review]
    G --> H[Support More<br/>Mothers]
    
    style A fill:#003366,color:#fff
    style E fill:#1F5C2E,color:#fff
    style H fill:#B48C00,color:#1A1A2E
```

## Data Flow: Marketplace Transaction

```mermaid
sequenceDiagram
    participant B as Buyer
    participant M as Marketplace
    participant S as Mother/Seller
    participant I as Income Tracker
    
    B->>M: Browse Products
    M->>B: Display Available Products
    B->>M: Select Product
    M->>B: Show Product Details
    B->>M: Place Order
    M->>S: Notify New Order
    S->>M: Confirm Order
    M->>B: Order Confirmed
    S->>B: Fulfill Order
    B->>S: Receive Product
    B->>M: Submit Rating
    M->>S: Update Rating
    M->>I: Record Transaction
    I->>S: Update Earnings
```

## System Architecture

```mermaid
flowchart TB
    subgraph Frontend[React Frontend]
        UI[User Interface<br/>React + Tailwind]
        Router[React Router<br/>Navigation]
        Context[User Context<br/>State Management]
    end
    
    subgraph UserTypes[User Types]
        Mother[Mother Dashboard<br/>Learn + Sell + Baby Health]
        Buyer[Buyer Dashboard<br/>Browse + Purchase]
    end
    
    subgraph Features[Core Features]
        Skills[Skills Library<br/>Video Lessons]
        Market[Marketplace<br/>Products & Orders]
        Health[Baby Health<br/>Tips & Tracking]
        Income[Income Tracker<br/>Earnings Analytics]
    end
    
    UI --> Router
    Router --> Context
    Context --> UserTypes
    Mother --> Features
    Buyer --> Market
    
    style Frontend fill:#EEF4FB
    style UserTypes fill:#D5F0D5
    style Features fill:#FFF8EE
```

## Feature Access Matrix

```mermaid
flowchart TD
    subgraph Mother[Mother User Access]
        M1[✓ Skills Library]
        M2[✓ My Shop]
        M3[✓ Marketplace Browse]
        M4[✓ Baby Health]
        M5[✓ Income Tracker]
        M6[✓ Community Groups]
    end
    
    subgraph Buyer[Buyer User Access]
        B1[✓ Marketplace Browse]
        B2[✓ Search Products]
        B3[✓ Category Filter]
        B4[✓ Seller Profiles]
        B5[✗ Skills Library]
        B6[✗ Baby Health]
    end
    
    style Mother fill:#1F5C2E,color:#fff
    style Buyer fill:#B48C00,color:#1A1A2E
```

## Offline Mode Flow

```mermaid
flowchart TD
    Online[App Running<br/>Online Mode] --> Check{Internet<br/>Connection?}
    
    Check -->|Yes| FullAccess[Full Access<br/>All Features Available]
    Check -->|No| Offline[Offline Mode<br/>Orange Banner]
    
    Offline --> OfflineFeatures{Available Offline}
    
    OfflineFeatures -->|Yes| Downloaded[Downloaded Skills<br/>Cached Products<br/>Saved Baby Tips]
    OfflineFeatures -->|No| Blocked[Feature Disabled<br/>Requires Internet]
    
    FullAccess --> SyncData[Sync Data<br/>Upload Changes]
    Downloaded --> LocalStorage[Load from<br/>Local Storage]
    
    style Online fill:#1F5C2E,color:#fff
    style Offline fill:#FFF8EE,color:#B48C00
    style Blocked fill:#FFE5E5,color:#DC2626
```
