'use client'
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/services/user-subscription";
import { UserSubscription } from "@/types/user-subscription";

export const useSubscription = () => {
    const { user, isLoading } = useAuth();
    const [subscription, setSubscription] = useState<UserSubscription>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getSubscription = async () => {
        if (!user) return;
        try {
            setLoading(true);
            setError(null);
            const response = await getUserSubscription(user.id);
            
            setSubscription(response);
        } catch (err) {
            console.error('Subscription fetch error:', err);
            setError('Failed to fetch subscription');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading) return;

        if (user) {
            getSubscription();
        }
    }, [user, isLoading]);

    return {
        subscription,
        loading,
        error,
        refetch: getSubscription
    };
}