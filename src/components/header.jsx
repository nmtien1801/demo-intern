import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Bell } from 'lucide-react';

export default function Header() {

    return (
        <header className="border-bottom shadow-sm bg-white">
            <div className="container py-3 d-flex justify-content-between align-items-center">
                <NavLink to="/" className="d-flex align-items-center text-decoration-none">
                    <div className="bg-primary rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <GraduationCap size={18} color="white" />
                    </div>
                    <span className="ms-2 h5 mb-0 text-dark fw-bold">EduMarket</span>
                </NavLink>

                <nav className="d-none d-md-flex gap-4">
                    <NavLink to="/" className={({ isActive }) =>
                        `text-decoration-none link-dark fw-medium ${isActive ? 'text-primary' : 'hover-text-primary'}`
                    } >
                        Trang chủ
                    </NavLink>
                    <NavLink to="/favorites" className={({ isActive }) =>
                        `text-decoration-none link-dark fw-medium ${isActive ? 'text-primary' : 'hover-text-primary'}`
                    } >
                        Yêu thích
                    </NavLink>
                    <NavLink to="/history" className={({ isActive }) =>
                        `text-decoration-none link-dark fw-medium ${isActive ? 'text-primary' : 'hover-text-primary'}`
                    } >
                        Lịch sử
                    </NavLink>
                </nav>

                <div className="d-none d-md-flex align-items-center gap-3">
                    <button className="btn btn-link text-dark p-0">
                        <Bell size={20} strokeWidth={2} className="text-dark hover-text-primary" />
                    </button>
                    <button className="btn btn-primary">
                        Đăng nhập
                    </button>
                </div>
            </div>
        </header>
    );
}
