"use server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { coupons } from "~/server/db/schema";

const createCoupon = async (couponData: any) => {
  if (!couponData) return null;

  const createdCoupon = await db.insert(coupons).values(couponData).returning();
  return createdCoupon[0];
}

const fetchCoupons = async () => {
  const availableCoupons = await db.select().from(coupons);
  return availableCoupons;
}

const updateCoupon = async (couponData: any) => {
  if (!couponData) return null;

  const updatedCoupon = await db
    .update(coupons)
    .set(couponData)
    .where(eq(coupons.id, couponData.id))
    .returning();
  return updatedCoupon[0];
}

export { fetchCoupons, createCoupon, updateCoupon }