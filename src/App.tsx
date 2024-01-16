import './App.css'
import { Routes, Route } from "react-router-dom"
// import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import { useEffect } from 'react'
import AdminLayout from './components/AdminLayout'
import AdminHome from './pages/admin/AdminHome'
import HomeLayout from './components/HomeLayout'
import CreateShelter from './pages/shelter/CreateShelter'
import ShelterHome from './pages/shelter/ShelterHome'
import ShelterLayout from './components/ShelterLayout'
import CreateCatogories from './pages/admin/CreateCatogories'
import SearchPage from './pages/SearchPage'
import DetailAnimal from './pages/DetailAnimal'
import Cart from './pages/Cart'
import Transaction from './pages/Transaction'
import TransactionDetail from './pages/TransactionDetail'
import SuccessPage from './pages/SuccessPage'
import ShelterTransaction from './pages/shelter/ShelterTransaction'
import ShelterTransactionDetail from './pages/shelter/ShelterTransactionDetail'
import EditShelter from './pages/shelter/EditShelter'
import AdminTransaction from './pages/admin/AdminTransaction'
import AdminTransactionDetail from './pages/admin/AdminTransactionDetail'
import AdminAnimal from './pages/admin/AdminAnimal'
import AdminBanner from './pages/admin/AdminBanner'
import ShelterAnimal from './pages/shelter/ShelterAnimal'
import NotFoundPage from './pages/NotFoundPage'
import ForgotPassword from './pages/ForgotPassword'
import SuccessSignUp from './pages/SuccessSignUp'
import VerifyEmail from './pages/VerifyEmail'
import SuccessSendResetPass from './pages/SuccessSendResetPass'
import ResetPassword from './pages/ResetPassword'
import WaitingApprovalShelter from './pages/WaitingApprovalShelter'
import EditShelterMenu from './pages/shelter/EditShelterMenu'

function App() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if(window.location.pathname !== "/login" && window.location.pathname !== "/register"){
  //     if(!localStorage.getItem('auth')){
  //       localStorage.clear();
  //       navigate("/login")
  //     }
  //   }
  // }, [window.location.pathname])

  return (
    <Routes>
      {/* <Route path='/' element={<Home />}></Route> */}
      <Route path="/" element={<HomeLayout />}>
        <Route path="" element={<Home />}/>
        <Route path="search-animal" element={<SearchPage />}/>
        <Route path="detail-animal/:id" element={<DetailAnimal />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="transaction" element={<Transaction />}/>
        <Route path="transaction/:id" element={<TransactionDetail />}/>
        <Route path="transaction/success" element={<SuccessPage />}/>
        <Route path="animal/shelter/:id" element={<ShelterAnimal />}/>
        {/* <Route path="tasks" element={<DashboardTasks />} /> */}
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="category" element={<CreateCatogories />} />
        <Route path="transaction" element={<AdminTransaction />} />
        <Route path="transaction/detail/:shelter_id/:id" element={<AdminTransactionDetail />} />
        <Route path="animal" element={<AdminAnimal />} />
        <Route path="banner" element={<AdminBanner />} />
      </Route>
      <Route path="/shelter" element={<ShelterLayout />}>
        <Route path="home" element={<ShelterHome />} />
        <Route path="setting" element={<EditShelterMenu />} />
        <Route path="transaction" element={<ShelterTransaction />} />
        <Route path="transaction/detail/:id" element={<ShelterTransactionDetail />} />
      </Route>
      <Route path="edit-shelter" element={<EditShelter />}/>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path="/create-shelter" element={<CreateShelter />}/>
      <Route path='/forget-password' element={<ForgotPassword />}></Route>
      <Route path='/success-signup' element={<SuccessSignUp />}></Route>
      <Route path='/verify-email' element={<VerifyEmail />}></Route>
      <Route path='/send-reset-pass' element={<SuccessSendResetPass />}></Route>
      <Route path='/reset-password' element={<ResetPassword />}></Route>
      <Route path='/waiting-approve-shelter' element={<WaitingApprovalShelter />}></Route>
      <Route path='*' element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default App
