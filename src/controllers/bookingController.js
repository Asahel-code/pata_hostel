require('dotenv').config();
const Tenant = require("../models/Tenant");
const House = require("../models/House");
const User = require('../models/User');
const { gmailTransport, paymentEmailTemplate, paymentApprovedEmailTemplate } = require("../utils/mails");

const fetchAllLandLordTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find();

        let landLordTenants = [];

        for (const tenant of tenants) {
            if (tenant.house.landlord == req.userId) {
                const hostel = await House.findOne({ _id: tenant.house.hostel });
                const tenantWithHostel = {
                    tenant,
                    hostel
                }
                landLordTenants.push(tenantWithHostel);
            }
        }
        return res.status(200).json(landLordTenants);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const getTenantBookings = async (req, res) => {
    try {
        const tenantBooking = await Tenant.find({ user: req.userId }).populate("house.hostel", "name");

        return res.status(200).json(tenantBooking);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const getSingleBooking = async (req, res) => {
    try {
        return res.status(200).json(res.tenant);
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const bookHouse = async (req, res) => {
    const { body } = req;

    const newBooking = new Tenant({
        roomNo: body.roomNo,
        house: body.house,
        rentalFee: body.rentalFee,
        user: req.userId,
        userDetails: body.userDetails,
    });

    try {
        await newBooking.save();

        return res.status(201).json({ message: `${req.user}, you have booked successfully` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }

}

const rentPayment = async (req, res) => {
    const { body } = req;

    res.tenant.tenant.isPaid = true;
    res.tenant.tenant.months = body?.months;
    res.tenant.tenant.paidAt = Date.now();
    res.tenant.tenant.paymentResult = body?.paymentResult;

    try {
        await res.tenant.tenant.save();

        const user = await User.findOne({ _id: res.tenant.tenant.user._id });

        // gmailTransport().sendMail({
        //     from: process.env.GMAIL_USER_NAME,
        //     to: user.email,
        //     subject: `Rental payment`,
        //     html: paymentEmailTemplate(res.tenant),
        // },
        //     (error, body) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log(body);
        //         }
        //     }
        // );

        return res.status(200).json({ message: 'Rental fee payed successfully' });
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const approvePayment = async (req, res) => {

    const currentDate = new Date();
    const monthDays = parseInt(res.tenant.tenant.months) * 30;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const dueDate = currentDate.getTime() + (monthDays * millisecondsPerDay);
    const fomartedDueDate = new Date(dueDate);

    res.tenant.tenant.isPaymentApproved = true;
    res.tenant.tenant.paymentDueDate = fomartedDueDate;
    res.tenant.tenant.paymentApprovedAt = Date.now();

    try {
        await res.tenant.tenant.save();

        const user = await User.findOne({ _id: res.tenant.tenant.user._id });

        // gmailTransport().sendMail({
        //     from: process.env.GMAIL_USER_NAME,
        //     to: user.email,
        //     subject: `Payment approved`,
        //     html: paymentApprovedEmailTemplate(res.tenant),
        // },
        //     (error, body) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log(body);
        //         }
        //     }
        // );

        return res.status(200).json({ message: "Payment has been approved" });
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const checkRoomAvailability = async (req, res) => {
    const { roomNo } = req.params;
    const { numberPerRoom } = req.params;

    try {
        const tenants = await Tenant.find({ roomNo: roomNo });

        let bookedSpace = [];

        for (const tenant of tenants) {
            if (tenant.paymentDueDate > new Date() || tenant.paymentDueDate == undefined || tenant.paymentDueDate == null) {
                bookedSpace.push(tenant);
            }
        }

        if (bookedSpace.length == numberPerRoom) {
            return res.status(200).json({ message: "Fully booked" });
        }
        else {
            return res.status(200).json({ message: "Space available" });
        }
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const checkIfTenantHasBooked = async (req, res) => {
    try {
        const tenant = await Tenant.findOne({ user: req.userId });

        if (tenant) {
            if (tenant.isPaid) {
                if (tenant.paymentDueDate > new Date()) {
                    return res.status(200).json({ message: "cannot book" });
                }
                else {
                    return res.status(200).json({ message: "can book" });
                }
            }
            return res.status(200).json({ message: "cannot book" });
        }
        else {
            return res.status(200).json({ message: "can book" });
        }

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

module.exports = {
    fetchAllLandLordTenants,
    getSingleBooking,
    getTenantBookings,
    bookHouse,
    rentPayment,
    approvePayment,
    checkRoomAvailability,
    checkIfTenantHasBooked
};